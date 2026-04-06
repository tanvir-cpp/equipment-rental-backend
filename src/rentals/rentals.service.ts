import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Equipment } from '../equipment/equipment.entity';


@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepo: Repository<Rental>,
    @InjectRepository(Equipment)
    private equipmentRepo: Repository<Equipment>,
  ) { }
// specific customer rentals



  async findByCustomer(customerId: number): Promise<Rental[]> {
    return this.rentalRepo.find({
      where: { customerId },
      relations: ['equipment'],
    });
  }
// new rental creation (one to many)Post request


  async create(customerId: number, dto: CreateRentalDto): Promise<Rental> {
    const equipment = await this.equipmentRepo.findOne({
      where: { id: dto.equipmentId }
    });
    if (!equipment) throw new NotFoundException('Equipment not found');
    if (!equipment.isAvailable) {
      throw new BadRequestException('Equipment is not available');
    }
// total price calculation


    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) throw new BadRequestException('Invalid date range');


    const totalPrice = days * Number(equipment.pricePerDay);
    const rental = this.rentalRepo.create({ customerId, totalPrice, ...dto });
    equipment.isAvailable = false;
    await this.equipmentRepo.save(equipment);
    return this.rentalRepo.save(rental);
  }

  // update rental status (PATCH request)



  async updateStatus(id: number, status: string): Promise<Rental> {
    const rental = await this.rentalRepo.findOne({ where: { id } });
    if (!rental) throw new NotFoundException('Rental not found');
    rental.status = status;
    return this.rentalRepo.save(rental);
  }

  // cancel rental (DELETE request)
  async cancel(id: number): Promise<{ message: string }> {
    const rental = await this.rentalRepo.findOne({
      where: { id }, relations: ['equipment']
    });
    if (!rental) throw new NotFoundException('Rental not found');
    rental.equipment.isAvailable = true;
    await this.equipmentRepo.save(rental.equipment);
    await this.rentalRepo.remove(rental);
    return { message: 'Rental successfully canceled' };
  }
}
