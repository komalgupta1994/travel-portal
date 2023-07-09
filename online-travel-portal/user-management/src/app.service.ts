import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class AppService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, 
  private jwtService: JwtService,
  @InjectMetric("user_metric") public counter: Counter<string>) { }

  async createUser(userDto: UserDto) {
    userDto.password = await this.encryptPassword(userDto.password);
    await this.userRepository.save(userDto);
    return 'User created successfully';
  }

  async updateUser(userDto: UserDto) {
    if (userDto.password) {
      userDto.password = await this.encryptPassword(userDto.password);
    }
    await this.userRepository.update(userDto.id, {
      ...userDto
    });
    return 'Update user info successfully';
  }

  async findUser(email: string) {
    const user = await this.userRepository.findOneBy({ email_id: email });
    return user;
  }

  async encryptPassword(password) {
    const saltOrRounds = await bcrypt.genSalt();
    return await bcrypt.hash(password, saltOrRounds);
  }

  async signIn(emailId: string, password: string) {
    console.log('counter--', this.counter)
    try {
      const user = await this.findUser(emailId);
      const isMatch = await bcrypt.compare(password, user?.password);
      if (!isMatch || emailId !== user.email_id) {
        throw new UnauthorizedException('Incorrect email id or password');
      }
      const payload = { id: user.id, email_id: user.email_id, name: user.name };
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    }
    catch {
      throw new UnauthorizedException('Incorrect email id or password');
    }
  }
}
