import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('bookings')
export class BookingsController {
  @Get()
  async getBookings() {
    // Todo: Implement this
  }

  @Post()
  async createBooking() {
    // Todo: Implement this
  }

  @Put()
  async updateBooking() {
    // Todo: Implement this
  }

  @Post(':id/accept')
  async acceptBooking() {
    // Todo: Implement this
  }

  @Post(':id/decline')
  async declineBooking() {
    // Todo: Implement this
  }
}
