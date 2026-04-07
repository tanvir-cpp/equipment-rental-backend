import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}
