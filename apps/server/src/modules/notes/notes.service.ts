import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Note } from './note.entity';
// import { RedisClientType, createClient } from 'redis';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Injectable()
export class NotesService {
  // private redisClient: RedisClientType;

  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>
  ) {}
  // ) {
  //   this.redisClient = createClient({
  //     url: process.env.REDIS_URL || 'redis://localhost:6379',
  //   });
  //   this.redisClient.connect();
  // }

  // private async invalidateCache(userId: string) {
  //   const keys = await this.redisClient.keys(`notes:${userId}:*`);
  //   if (keys.length > 0) {
  //     await this.redisClient.del(keys);
  //   }
  // }

  async create(userId: string, body: CreateNoteDto) {
    const note = this.noteRepository.create({ ...body, user: { id: userId } });
    const savedNote = await this.noteRepository.save(note);
    // await this.invalidateCache(userId);
    return savedNote;
  }

  async findAll(userId: string, tag?: string): Promise<Note[]> {
    // const cacheKey = `notes:${userId}:${tag || 'all'}`;
    // const cachedNotes = await this.redisClient.get(cacheKey);
    // if (cachedNotes) {
    //   return JSON.parse(cachedNotes);
    // }
    const notes = await this.noteRepository.find({
      where: tag
        ? { user: { id: userId }, tags: ILike(`%${tag}%`) }
        : { user: { id: userId } },
      order: { updatedAt: 'DESC' },
    });
    // await this.redisClient.setEx(cacheKey, 60, JSON.stringify(notes));
    return notes;
  }

  async findOne(userId: string, id: string): Promise<Note | null> {
    return await this.noteRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async update(userId: string, id: string, body: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(userId, id);
    if (!note) throw new NotFoundException('Note not found');

    Object.assign(note, body);
    const updatedNote = await this.noteRepository.save(note);
    // await this.invalidateCache(note.user.id);
    return updatedNote;
  }

  async delete(userId: string, id: string): Promise<void> {
    const res = await this.noteRepository.delete({ id, user: { id: userId } });
    if (!res.affected) throw new NotFoundException('Note not found');
    // await this.invalidateCache(res.raw.userId);
  }
}
