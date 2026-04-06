import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [AdminModule,TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: '',
database: 'equipment_rental',//Change to your database name
autoLoadEntities: true,
synchronize: true,
} )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
