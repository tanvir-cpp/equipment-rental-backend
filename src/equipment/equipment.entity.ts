import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Rental } from '../rentals/rental.entity';
import { Customer } from '../customer/customer.entity';


@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;



  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerDay!: number;


  @Column({ default: true })
  isAvailable!: boolean;


  @OneToMany(() => Rental, (rental) => rental.equipment)
  rentals!: Rental[];


  @ManyToMany(() => Customer, (customer) => customer.favoriteEquipments)
  customers!: Customer[];
}
