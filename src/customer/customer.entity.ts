import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, ManyToMany, JoinTable, CreateDateColumn

} from 'typeorm';
import { Rental } from '../rentals/rental.entity';
import { Equipment } from '../equipment/equipment.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @CreateDateColumn()
  createdAt!: Date;
  //one to many relationship with rentals
  @OneToMany(() => Rental, rental => rental.customer)
  rentals!: Rental[];

  @ManyToMany(() => Equipment, (equipment) => equipment.customers)
  @JoinTable({
    name: 'customer_favorite_equipment',
    joinColumn: { name: 'customer_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'equipment_id', referencedColumnName: 'id' },
  })
  favoriteEquipments!: Equipment[];
}
