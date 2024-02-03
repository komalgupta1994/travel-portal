import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { BookingDto } from './dto/booking.dto';
import { Booking } from './entities/booking.entity';
import { Payment } from './entities/payment.entity';
import { RedisService } from './redis/redis.service';
import { keyExpirationTime } from './redis/redis.config';

@Injectable()
export class BookingService {
  bookingAmount: number;
  constructor(
    @InjectRepository(User, 'user')
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly redisService: RedisService,
  ) {
    this.redisService.redisExpiredFunction().subscribe((bookingId) => {
      console.log('delete key from redis', bookingId);
      this.bookingRepository.delete(bookingId);
    });
  }

  public async book(userInfo, bookingDto: BookingDto) {
    const currentDate = new Date();
    if (
      new Date(bookingDto.check_in_date) < currentDate ||
      new Date(bookingDto.check_out_date) < currentDate
    ) {
      return 'The entered date is in the past.';
    }
    const roomData = await this.checkRoom(bookingDto.room_id);
    if (!roomData) {
      return 'Invalid room id';
    }
    bookingDto.check_in_date = new Date(bookingDto.check_in_date);
    bookingDto.check_out_date = new Date(bookingDto.check_out_date);

    const booking = new Booking();
    booking.room_id = bookingDto.room_id;
    booking.userIdMap = userInfo;
    booking.room_qt = bookingDto.quantity;
    booking.check_in_dt = bookingDto.check_in_date;
    booking.check_out_dt = bookingDto.check_out_date;
    booking.status = 'Reserved';

    const recentBookingData = await this.getBookingByUserId(userInfo.id);
    if (recentBookingData) {
      return 'Your one booking already in progress';
    }

    const bookingData = await this.checkRoomAvailability(bookingDto);
    const bookedRoomCount = bookingData.reduce((prev, curr) => {
      return prev + curr.room_qt;
    }, 0);

    if (roomData.quantity - bookedRoomCount >= bookingDto.quantity) {
      this.bookingAmount = bookingDto.quantity * roomData.price;
      const savedData = await this.bookingRepository
        .createQueryBuilder()
        .insert()
        .into(Booking)
        .values(booking)
        .execute();
      this.redisService.setKey(
        `booking:${savedData.identifiers[0].id}`,
        'Reserved',
        keyExpirationTime,
      );

      return 'Your booking is in progress';
    } else {
      return 'No room available for specific dates';
    }
  }

  public async payment(bookingId: { booking_id: number }) {
    const bookId = bookingId.booking_id;
    const payment = new Payment();
    payment.booking_id = bookId;
    payment.amount = this.bookingAmount;
    payment.status = 'Completed';
    this.paymentRepository
      .createQueryBuilder()
      .insert()
      .into(Payment)
      .values(payment)
      .execute()
      .then(async () => {
        await this.bookingRepository.update(bookId, {
          status: 'Completed',
        });
        await this.redisService.deleteKey(`booking:${bookId}`);
        return 'Payment Successful';
      })
      .catch((err) => {
        console.log('error at payment time', err);
        throw new HttpException('Error from payments', HttpStatus.BAD_REQUEST);
      });
  }

  private async checkRoom(roomId: number) {
    return await this.roomRepository.findOneBy({ id: roomId });
  }

  private async checkRoomAvailability(
    bookingDto: BookingDto,
  ): Promise<Booking[]> {
    const booking = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.room_id = :roomId', { roomId: bookingDto.room_id })
      .andHaving(
        `(booking.check_in_dt >= :check_in_date AND booking.check_in_dt < :check_out_date) OR 
                        (booking.check_out_dt > :check_in_date AND booking.check_out_dt <= :check_out_date) OR
                        (booking.check_in_dt <= :check_in_date AND booking.check_out_dt >= :check_out_date)`,
        {
          check_in_date: bookingDto.check_in_date,
          check_out_date: bookingDto.check_out_date,
        },
      )
      .getMany();
    return booking;
  }

  private async getBookingByUserId(userId: number) {
    return await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.user_id = :userId AND booking.status = :status', {
        userId,
        status: 'Reserved',
      })
      .getOne();
  }
}
