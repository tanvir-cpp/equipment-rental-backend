import { AdminService } from './admin.service';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller'

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
