import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsMobilePhone } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;



  @IsOptional()
  @IsMobilePhone('bn-BD', {}, { message: 'Invalid phone number format for Bangladesh' })
  phone?: string;



  @IsOptional()
  @IsString()
  address?: string;
}
