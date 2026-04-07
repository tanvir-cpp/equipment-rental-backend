import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EquipmentCategoryEntity } from './equipment-category.entity';
import { RentalEntity } from './rental.entity';

@Entity('equipments')
export class EquipmentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  serialNumber!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  dailyRate!: number;

  @Column({ default: true })
  isAvailable!: boolean;

  @ManyToOne(() => EquipmentCategoryEntity, (category) => category.equipments, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category!: EquipmentCategoryEntity | null;

  @ManyToMany(() => RentalEntity, (rental) => rental.equipments)
  rentals!: RentalEntity[];
}
