import { Injectable } from "@nestjs/common";
import { MulterError, diskStorage } from "multer";

@Injectable()
export class AdminService {

  userAllData(): string {
    let userInfo = {
      name: "sajid",
      age: 25,
      email: "sajid@admin.xyz",
      address: "kamalapur",
    };

    return JSON.stringify(userInfo);
  }

  userData(userId: number): string {
    return JSON.stringify({
      name: "sajid",
      id: userId
    });
  }

  createUser(info: any, file: Express.Multer.File): any {
    return {
      message: "User created successfully",
      userData: info,
      uploadedFile: {
        fileName: file.originalname,
        fileSize: file.size
      }
    };
  }

  upUser(body: any) {
    body.name = "sajid";
    return body;
  }

  getAdminProfile(): object {
    return {
      role: "admin",
      access: "full",
    };
  }

  loginAdmin(body: any): object {
    return {
      message: "Login successful",
      username: body.username
    };
  }

  updateEmail(id: number, body: any): object {
    return {
      id: id,
      newEmail: body.email
    };
  }

  deleteUser(id: number): object {
    return {
      message: "User deleted",
      deletedId: id
    };
  }
}