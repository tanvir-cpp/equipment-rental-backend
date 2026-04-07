import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import {
  CreateAdminDto,
  LoginAdminDto,
  UpdateAdminDto,
  UpdateEmailDto,
} from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async userAllData() {
    return this.adminRepo.find({
      order: { id: 'ASC' },
      select: {
        id: true,
        name: true,
        age: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        nidImagePath: true,
        password: false,
      },
    });
  }

  async userData(userId: number) {
    const admin = await this.adminRepo.findOne({ where: { id: userId } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${userId} not found`);
    }

    return this.sanitizeAdmin(admin);
  }

  async createUser(info: CreateAdminDto, file?: Express.Multer.File) {
    const existing = await this.adminRepo.findOne({ where: { email: info.email } });
    if (existing) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(info.password, 10);
    const admin = this.adminRepo.create({
      ...info,
      password: hashedPassword,
      nidImagePath: file ? `uploads/${file.originalname}` : null,
    });

    const saved = await this.adminRepo.save(admin);
    return {
      message: 'Admin created successfully',
      data: this.sanitizeAdmin(saved),
    };
  }

  async upUser(id: number, body: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    Object.assign(admin, body);
    const updated = await this.adminRepo.save(admin);
    return {
      message: 'Admin updated successfully',
      data: this.sanitizeAdmin(updated),
    };
  }

  getAdminProfile(user: { userId: number; email: string; role: string }) {
    return {
      message: 'Protected profile data',
      profile: user,
    };
  }

  async loginAdmin(body: LoginAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { email: body.email } });
    if (!admin) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    const passwordMatched = await bcrypt.compare(body.password, admin.password);
    if (!passwordMatched) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.jwtService.signAsync({
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    });

    return {
      message: 'Login successful',
      accessToken: token,
      admin: this.sanitizeAdmin(admin),
    };
  }

  async updateEmail(id: number, body: UpdateEmailDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    const sameEmail = await this.adminRepo.findOne({ where: { email: body.email } });
    if (sameEmail && sameEmail.id !== id) {
      throw new BadRequestException('Email already used by another admin');
    }

    admin.email = body.email;
    const updated = await this.adminRepo.save(admin);

    return {
      message: 'Email updated successfully',
      data: this.sanitizeAdmin(updated),
    };
  }

  async deactivateUser(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    admin.isActive = false;
    const updated = await this.adminRepo.save(admin);
    return {
      message: 'Admin deactivated successfully',
      data: this.sanitizeAdmin(updated),
    };
  }

  async deleteUser(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    await this.adminRepo.remove(admin);
    return {
      message: 'Admin deleted successfully',
      deletedId: id,
    };
  }

  private sanitizeAdmin(admin: AdminEntity) {
    const { password, ...safeAdmin } = admin;
    return safeAdmin;
  }
}
