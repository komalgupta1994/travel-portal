import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Hotel } from './entities/hotel.entity';
import { BookingService } from './booking.service';
import { Room } from './entities/room.entity';
import { BookingDto } from './dto/booking.dto';
import { Booking } from './entities/booking.entity';
import { AuthGuard } from './guards/auth.guard';

@Controller('')
@UseGuards(AuthGuard)
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Post('/book') 
    async hotelBooking(@Request() request , @Body() bookingDto: BookingDto) {
        return await this.bookingService.book(request['user'], bookingDto);
    }

    @Post('/payment')
    async bookingPayment(@Body() id: {booking_id: number}) {
        return await this.bookingService.payment(id);
    }
}
