import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CustomerEntity } from './customer.entity';
import { EquipmentCategoryEntity } from './equipment-category.entity';
import { EquipmentController } from './equipment.controller';
import { EquipmentEntity } from './equipment.entity';
import { EquipmentService } from './equipment.service';
import { RentalEntity } from './rental.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EquipmentCategoryEntity,
      EquipmentEntity,
      CustomerEntity,
      RentalEntity,
    ]),
    AuthModule,
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
