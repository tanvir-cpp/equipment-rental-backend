import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { Equipment } from '../equipment/equipment.entity';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Equipment])],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule { }
