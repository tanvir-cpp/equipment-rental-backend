import {
  Injectable, NotFoundException, BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) { }

  // show all customers


  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find({
      select: ['id', 'name', 'email', 'phone', 'address', 'createdAt'],
    });
  }
// search one customer by id



  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'phone', 'address', 'createdAt'],
    });
    if (!customer) {
      // HttpException - NotFoundException
      throw new NotFoundException(`Customer ID ${id} not found`);
    }
    return customer;
  }

  // customer rental history one to many relationship with rental, show all rentals of a customer


  async findWithRentals(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({
      where: { id },
      relations: ['rentals', 'rentals.equipment'],
    });
    if (!customer) {
      throw new NotFoundException(`Customer ID ${id} not found`);
    }
    return customer;
  }
// customer fav equipments many to many relationship with equipment, show all favorite equipments of a customer


  async findWithFavorites(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({
      where: { id },
      relations: ['favoriteEquipments'],
    });
    if (!customer) {
      throw new NotFoundException(`Customer ID ${id} not found`);
    }
    return customer;
  }

  // customer full update(Put
  )


  async update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    Object.assign(customer, dto);
    return this.customerRepo.save(customer);
  }

  // customer partial update(Patch)


  async partialUpdate(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepo.preload({ id, ...dto });
    if (!customer) {
      throw new NotFoundException(`Customer ID ${id} পাওয়া যায়নি`);
    }
    return this.customerRepo.save(customer);
  }

  // customer delete (Delete)



  async remove(id: number): Promise<{ message: string }> {
    const customer = await this.findOne(id);
    await this.customerRepo.remove(customer);
    return { message: `Customer ID ${id} deleted successfully` };
  }

  // customer favorite equipment add


  async addFavorite(customerId: number, equipmentId: number) {
    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
      relations: ['favoriteEquipments'],
    });
    if (!customer) throw new NotFoundException('Customer not found');
    const alreadyAdded = customer.favoriteEquipments.some(e => e.id === equipmentId);
    if (alreadyAdded) throw new BadRequestException('Equipment is already in favorites');
    customer.favoriteEquipments.push({ id: equipmentId } as any);
    return this.customerRepo.save(customer);
  }

  // customer favorite equipment remove (many to many delete)



  async removeFavorite(customerId: number, equipmentId: number) {
    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
      relations: ['favoriteEquipments'],
    });
    if (!customer) throw new NotFoundException('Customer not found');
    customer.favoriteEquipments = customer.favoriteEquipments.filter(
      e => e.id !== equipmentId
    );
    return this.customerRepo.save(customer);
  }
}
