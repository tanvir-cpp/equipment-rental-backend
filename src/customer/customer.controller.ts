import {
  Controller, Get, Post, Put, Patch, Delete,
  Param, Body, UseGuards, ParseIntPipe, HttpCode, HttpStatus
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('customers')
@UseGuards(JwtAuthGuard) // all route in this controller are protected by JWT authentication

export class CustomersController {
  constructor(private customersService: CustomersService) { }


  // Route 3: GET /customers
  @Get()
  findAll() {
    return this.customersService.findAll();
  }


  // Route 4: GET /customers/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }



  // Route 5: GET /customers/:id/rentals (One-to-Many Relationship Route)
  @Get(':id/rentals')
  findWithRentals(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findWithRentals(id);
  }


  // Route 6: GET /customers/:id/favorites (Many-to-Many Relationship Route)
  @Get(':id/favorites')
  findWithFavorites(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findWithFavorites(id);
  }


  // Route 7: PUT /customers/:id (Full Update)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, dto);
  }


  // Route 8: PATCH /customers/:id (Partial Update)
  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.partialUpdate(id, dto);
  }


  // Route 9: DELETE /customers/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }




  // Route 10: POST /customers/:id/favorites (Many-to-Many Add)
  @Post(':customerId/favorites/:equipmentId')
  addFavorite(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('equipmentId', ParseIntPipe) equipmentId: number,
  ) {
    return this.customersService.addFavorite(customerId, equipmentId);
  }


  // Route 11: DELETE /customers/:id/favorites/:equipmentId (Many-to-Many Remove)
  @Delete(':customerId/favorites/:equipmentId')
  removeFavorite(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('equipmentId', ParseIntPipe) equipmentId: number,
  ) {
    return this.customersService.removeFavorite(customerId, equipmentId);
  }
}

