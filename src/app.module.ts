import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/customer.entity';
import { Rental } from './rentals/rental.entity';
import { Equipment } from './equipment/equipment.entity';
import { CustomerModule } from './customer/customer.module';
import { RentalsModule } from './rentals/rentals.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Customer, Rental, Equipment],
        synchronize: true,   // Development only
      }),
      inject: [ConfigService],
    }),
    CustomerModule,
    RentalsModule,
    AuthModule,
    MailerModule,
  ],
})
export class AppModule { }
