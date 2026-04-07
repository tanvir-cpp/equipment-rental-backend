import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { EquipmentEntity } from './equipment.entity';

@Entity('rentals')
export class RentalEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  startDate!: string;

  @Column({ type: 'date' })
  endDate!: string;

  @Column({ default: 'BOOKED' })
  status!: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.rentals, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer!: CustomerEntity;

  @ManyToMany(() => EquipmentEntity, (equipment) => equipment.rentals, {
    eager: true,
  })
  @JoinTable({ name: 'rental_equipments' })
  equipments!: EquipmentEntity[];
}
