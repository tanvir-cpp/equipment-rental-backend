import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { EquipmentCategoryEntity } from './equipment-category.entity';
import {
  CreateCategoryDto,
  CreateCustomerDto,
  CreateEquipmentDto,
  CreateRentalDto,
  UpdateEquipmentDto,
} from './equipment.dto';
import { EquipmentEntity } from './equipment.entity';
import { RentalEntity } from './rental.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(EquipmentCategoryEntity)
    private readonly categoryRepo: Repository<EquipmentCategoryEntity>,
    @InjectRepository(EquipmentEntity)
    private readonly equipmentRepo: Repository<EquipmentEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>,
    @InjectRepository(RentalEntity)
    private readonly rentalRepo: Repository<RentalEntity>,
  ) {}

  async createCategory(body: CreateCategoryDto) {
    const exists = await this.categoryRepo.findOne({ where: { name: body.name } });
    if (exists) {
      throw new BadRequestException('Category already exists');
    }

    const category = this.categoryRepo.create(body);
    return this.categoryRepo.save(category);
  }

  async getCategories() {
    return this.categoryRepo.find({ relations: { equipments: true } });
  }

  async createEquipment(body: CreateEquipmentDto) {
    const category = await this.categoryRepo.findOne({ where: { id: body.categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const duplicate = await this.equipmentRepo.findOne({
      where: { serialNumber: body.serialNumber },
    });
    if (duplicate) {
      throw new BadRequestException('Serial number already exists');
    }

    const equipment = this.equipmentRepo.create({
      name: body.name,
      serialNumber: body.serialNumber,
      dailyRate: body.dailyRate,
      category,
      isAvailable: true,
    });

    return this.equipmentRepo.save(equipment);
  }

  async getAllEquipments() {
    return this.equipmentRepo.find({ relations: { rentals: true } });
  }

  async getEquipmentById(id: number) {
    const equipment = await this.equipmentRepo.findOne({
      where: { id },
      relations: { rentals: true },
    });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    return equipment;
  }

  async updateEquipment(id: number, body: UpdateEquipmentDto) {
    const equipment = await this.equipmentRepo.findOne({ where: { id } });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    if (body.categoryId) {
      const category = await this.categoryRepo.findOne({ where: { id: body.categoryId } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      equipment.category = category;
    }

    Object.assign(equipment, {
      name: body.name ?? equipment.name,
      serialNumber: body.serialNumber ?? equipment.serialNumber,
      dailyRate: body.dailyRate ?? equipment.dailyRate,
      isAvailable: body.isAvailable ?? equipment.isAvailable,
    });

    return this.equipmentRepo.save(equipment);
  }

  async deleteEquipment(id: number) {
    const equipment = await this.equipmentRepo.findOne({ where: { id } });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    await this.equipmentRepo.remove(equipment);
    return { message: 'Equipment deleted successfully', deletedId: id };
  }

  async getEquipmentsByCategory(categoryId: number) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
      relations: { equipments: true },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async createCustomer(body: CreateCustomerDto) {
    const duplicate = await this.customerRepo.findOne({ where: { email: body.email } });
    if (duplicate) {
      throw new BadRequestException('Customer email already exists');
    }
    const customer = this.customerRepo.create(body);
    return this.customerRepo.save(customer);
  }

  async getCustomers() {
    return this.customerRepo.find({ relations: { rentals: true } });
  }

  async createRental(body: CreateRentalDto) {
    const customer = await this.customerRepo.findOne({ where: { id: body.customerId } });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const equipments = await this.equipmentRepo.find({
      where: { id: In(body.equipmentIds) },
    });

    if (equipments.length !== body.equipmentIds.length) {
      throw new BadRequestException('One or more equipment ids are invalid');
    }

    const unavailable = equipments.find((equipment) => !equipment.isAvailable);
    if (unavailable) {
      throw new BadRequestException(
        `Equipment ${unavailable.name} is not available for rental`,
      );
    }

    const rental = this.rentalRepo.create({
      startDate: body.startDate,
      endDate: body.endDate,
      customer,
      equipments,
      status: 'BOOKED',
    });

    const savedRental = await this.rentalRepo.save(rental);

    for (const equipment of equipments) {
      equipment.isAvailable = false;
      await this.equipmentRepo.save(equipment);
    }

    return savedRental;
  }

  async getRentals() {
    return this.rentalRepo.find();
  }

  async getRentalById(id: number) {
    const rental = await this.rentalRepo.findOne({ where: { id } });
    if (!rental) {
      throw new NotFoundException('Rental not found');
    }
    return rental;
  }

  async returnRental(id: number) {
    const rental = await this.rentalRepo.findOne({ where: { id } });
    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    rental.status = 'RETURNED';
    const updated = await this.rentalRepo.save(rental);

    for (const equipment of updated.equipments) {
      equipment.isAvailable = true;
      await this.equipmentRepo.save(equipment);
    }

    return updated;
  }

  async deleteRental(id: number) {
    const rental = await this.rentalRepo.findOne({ where: { id } });
    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    await this.rentalRepo.remove(rental);
    return { message: 'Rental deleted successfully', deletedId: id };
  }
}
