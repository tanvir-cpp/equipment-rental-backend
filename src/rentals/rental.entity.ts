import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Equipment } from '../equipment/equipment.entity';


@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  startDate!: string;

  @Column({ type: 'date' })
  endDate!: string;



  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice!: number;

  @Column({ default: 'pending' })
  status!: string; //pending | active | completed | cancelled

  @CreateDateColumn()
  createdAt!: Date;


  // many to one relationship with customer


  @ManyToOne(() => Customer, (customer) => customer.rentals, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;


  @Column()
  customerId!: number;

  // many to one relationship with equipment


  @ManyToOne(() => Equipment, (equipment) => equipment.rentals)
  @JoinColumn({ name: 'equipmentId' })
  equipment!: Equipment;


  @Column()
  equipmentId!: number;
}
