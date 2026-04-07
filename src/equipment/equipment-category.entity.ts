import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EquipmentEntity } from './equipment.entity';

@Entity('equipment_categories')
export class EquipmentCategoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => EquipmentEntity, (equipment) => equipment.category)
  equipments!: EquipmentEntity[];
}
