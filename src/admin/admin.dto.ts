import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z ]+$/, { message: 'Name must contain only alphabets' })
  name!: string;

  @IsInt()
  @Min(18)
  @Max(80)
  age!: number;

  @IsEmail()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' })
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z ]+$/, { message: 'Name must contain only alphabets' })
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(80)
  age?: number;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class LoginAdminDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class UpdateEmailDto {
  @IsEmail()
  email!: string;
}
