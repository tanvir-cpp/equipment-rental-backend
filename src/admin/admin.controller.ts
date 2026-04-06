import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";
import { AdminService } from "./admin.service";
import { AdminDto } from "./admin.dto";
import  { MulterError, diskStorage } from "multer";

@Controller('/admin')
export class AdminController {

  constructor(private readonly appService: AdminService) {}

  @Get('/users')
  AllUserData(): string {
    return this.appService.userAllData();
  }

  @Get("/user/:id")
  UserData(@Param('id', ParseIntPipe) p: number): string {
    return this.appService.userData(p);
  }

  @Post("/createuser")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseInterceptors(FileInterceptor('nidImage'))
  CreateUser(
    @Body() body: AdminDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2 * 1024 * 1024 // 2MB
          }),
        ],
      }),
    )
    file: Express.Multer.File
  ) {
    return this.appService.createUser(body, file);
  }

  @Put('/upUser')
  UpdateUser(@Body() body: any) {
    return this.appService.upUser(body);
  }

  @Get("/profile")
  GetProfile() {
    return this.appService.getAdminProfile();
  }

  @Post("/login")
  Login(@Body() body: any) {
    return this.appService.loginAdmin(body);
  }

  @Put("/update-email/:id")
  UpdateEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any
  ) {
    return this.appService.updateEmail(id, body);
  }

  @Delete("/delete/:id")
  DeleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteUser(id);
  }
}