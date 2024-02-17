import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'notification_exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672', // replace with your RabbitMQ server URI
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
