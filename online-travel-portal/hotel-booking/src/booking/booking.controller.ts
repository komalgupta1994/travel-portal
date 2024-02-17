import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('')
@UseGuards(AuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/book')
  async hotelBooking(@Request() request, @Body() bookingDto: BookingDto) {
    return await this.bookingService.book(request['user'], bookingDto);
  }

  @Post('/payment')
  async bookingPayment(@Request() request, @Body() id: { booking_id: number }) {
    return await this.bookingService.payment(id, request['user']);
  }
}
