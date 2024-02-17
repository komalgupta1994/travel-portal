import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Booking } from './entities/booking.entity';
import { Hotel } from './entities/hotel.entity';
import { Payment } from './entities/payment.entity';
import { Room } from './entities/room.entity';
import { UserModule } from '../user/user.module';
import { RedisService } from './redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { rabbitMQConfig } from './config/rabbitMQ.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel, Room, Booking, Payment, User]),
    RabbitMQModule.forRoot(rabbitMQConfig),
    UserModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, RedisService, JwtService],
})
export class BookingModule {}
