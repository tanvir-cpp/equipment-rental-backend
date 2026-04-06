import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('customers/:customerId/rentals')
@UseGuards(JwtAuthGuard)
export class RentalsController {
  constructor(private rentalsService: RentalsService) { }

  //


  // Route: GET /customers/:customerId/rentals
  @Get()
  findByCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.rentalsService.findByCustomer(customerId);
  }


  // Route: POST /customers/:customerId/rentals
  @Post()
  create(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() dto: CreateRentalDto,
  ) {
    return this.rentalsService.create(customerId, dto);
  }


  // Route: PATCH /customers/:customerId/rentals/:id
  @Patch(':id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.rentalsService.updateStatus(id, status);
  }


  // Route: DELETE /customers/:customerId/rentals/:id
  @Delete(':id')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.cancel(id);
  }
}
