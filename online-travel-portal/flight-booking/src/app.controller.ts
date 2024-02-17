import { Controller, Get } from '@nestjs/common';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService, private readonly amqpConnection: AmqpConnection) {}

  @Get('/book')
  async getFlight() {
    await this.amqpConnection.publish('notification_exchange', 'notification_routing_key', {msg: 'hello from flight booking!!'});
    return this.appService.getFlight();
  }
}
