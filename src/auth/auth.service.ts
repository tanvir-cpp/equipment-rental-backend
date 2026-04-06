import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from '../customers/customer.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '../mailer/mailer.service';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) { }


  async register(dto: RegisterDto) {
    // Email duplicate check
    const exists = await this.customerRepo.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new ConflictException('Email already in use');
    }
// bycrypt password


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);


    const customer = this.customerRepo.create({
      ...dto,
      password: hashedPassword,
    });
    const saved = await this.customerRepo.save(customer);
// welcome email
    await this.mailerService.sendWelcomeEmail(saved.email, saved.name);

// wel
    const { password, ...result } = saved;
    return result;

  }



  async login(dto: LoginDto) {
    const customer = await this.customerRepo.findOne({
      where: { email: dto.email },
    });


    if (!customer) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    // bycrypt compare password and check if match


    const isMatch = await bcrypt.compare(dto.password, customer.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email বা Password ভুল');
    }
// jwt token generate

    const payload = { sub: customer.id, email: customer.email };
    const token = this.jwtService.sign(payload);


    return { access_token: token, customerId: customer.id };
  }
}

