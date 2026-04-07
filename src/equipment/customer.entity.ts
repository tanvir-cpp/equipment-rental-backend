import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RentalEntity } from './rental.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @OneToMany(() => RentalEntity, (rental) => rental.customer)
  rentals!: RentalEntity[];
}
