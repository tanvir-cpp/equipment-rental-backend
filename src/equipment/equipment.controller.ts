import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateCategoryDto,
  CreateCustomerDto,
  CreateEquipmentDto,
  CreateRentalDto,
  UpdateEquipmentDto,
} from './equipment.dto';
import { EquipmentService } from './equipment.service';

@UseGuards(JwtAuthGuard)
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post('categories')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.equipmentService.createCategory(body);
  }

  @Get('categories')
  getCategories() {
    return this.equipmentService.getCategories();
  }

  @Get('category/:categoryId')
  getEquipmentsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.equipmentService.getEquipmentsByCategory(categoryId);
  }

  @Post('customers')
  createCustomer(@Body() body: CreateCustomerDto) {
    return this.equipmentService.createCustomer(body);
  }

  @Get('customers/all')
  getCustomers() {
    return this.equipmentService.getCustomers();
  }

  @Post('rentals')
  createRental(@Body() body: CreateRentalDto) {
    return this.equipmentService.createRental(body);
  }

  @Get('rentals/all')
  getRentals() {
    return this.equipmentService.getRentals();
  }

  @Get('rentals/:id')
  getRentalById(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.getRentalById(id);
  }

  @Patch('rentals/:id/return')
  returnRental(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.returnRental(id);
  }

  @Delete('rentals/:id')
  deleteRental(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.deleteRental(id);
  }

  @Post()
  createEquipment(@Body() body: CreateEquipmentDto) {
    return this.equipmentService.createEquipment(body);
  }

  @Get()
  getAllEquipments() {
    return this.equipmentService.getAllEquipments();
  }

  @Get(':id')
  getEquipmentById(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.getEquipmentById(id);
  }

  @Patch(':id')
  updateEquipment(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEquipmentDto,
  ) {
    return this.equipmentService.updateEquipment(id, body);
  }

  @Delete(':id')
  deleteEquipment(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.deleteEquipment(id);
  }
}
