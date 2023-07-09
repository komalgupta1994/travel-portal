import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Booking } from 'src/booking/entities/booking.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Booking], 'user'),
      ],
      exports: [TypeOrmModule]
})
export class UserModule {}
