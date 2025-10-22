import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';

interface AuthenticatedRequest extends Request {
  user: { id: string };
}
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(@Req() req: AuthenticatedRequest, @Query('tag') tag?: string) {
    return this.notesService.findAll(req.user.id, tag);
  }

  @Get(':id')
  async findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.notesService.findAll(req.user.id, id);
  }

  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() body: CreateNoteDto) {
    return this.notesService.create(req.user.id, body);
  }

  @Put(':id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() body: UpdateNoteDto
  ) {
    return this.notesService.update(req.user.id, id, body);
  }

  @Delete(':id')
  async delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.notesService.delete(req.user.id, id);
  }
}
