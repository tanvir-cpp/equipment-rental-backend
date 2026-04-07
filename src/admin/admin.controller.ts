import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateAdminDto,
  LoginAdminDto,
  UpdateAdminDto,
  UpdateEmailDto,
} from './admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  allUserData() {
    return this.adminService.userAllData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  userData(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.userData(id);
  }

  @Post('createuser')
  @UseInterceptors(FileInterceptor('nidImage'))
  createUser(
    @Body() body: CreateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.adminService.createUser(body, file);
  }

  @UseGuards(JwtAuthGuard)
  @Put('upUser/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAdminDto,
  ) {
    return this.adminService.upUser(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request & { user?: any }) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.adminService.getAdminProfile(req.user);
  }

  @Post('login')
  login(@Body() body: LoginAdminDto) {
    return this.adminService.loginAdmin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-email/:id')
  updateEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEmailDto,
  ) {
    return this.adminService.updateEmail(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('deactivate/:id')
  deactivateUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deactivateUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }
}
