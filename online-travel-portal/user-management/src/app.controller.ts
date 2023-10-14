import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/user-dto';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  async createUser(@Body() user: UserDto) {
    return await this.appService.createUser(user);
  }

  @Post('/update')
  async updateUser(@Body() user: UserDto) {
    return await this.appService.updateUser(user);
  }

  @Post('/signIn')
  async signIn(@Body() user: UserDto) {
    return await this.appService.signIn(user.email_id, user.password);
  }
}
