import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password?: string;

  @IsOptional()
  @IsMobilePhone('bn-BD', {}, { message: 'Invalid phone number format for Bangladesh' })
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
