import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const loginToken = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });
    return { token: loginToken };
  }

  async register(body: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = this.userRepository.create({
      email: body.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    const { password: _, ...result } = savedUser;
    return result;
  }
}
