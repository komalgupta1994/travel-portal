import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userConfig } from './user/config/user.config';
import { bookingConfig } from './booking/config/booking.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(userConfig),
    TypeOrmModule.forRoot(bookingConfig),
    UserModule,
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
