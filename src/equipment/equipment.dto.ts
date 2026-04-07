import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  serialNumber!: string;

  @IsNumber()
  @IsPositive()
  dailyRate!: number;

  @IsInt()
  @Min(1)
  categoryId!: number;
}

export class UpdateEquipmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  dailyRate?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  categoryId?: number;

  @IsOptional()
  isAvailable?: boolean;
}

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^[0-9+\- ]+$/, { message: 'Phone must be valid' })
  phone!: string;
}

export class CreateRentalDto {
  @IsInt()
  @Min(1)
  customerId!: number;

  @IsArray()
  @ArrayMinSize(1)
  equipmentIds!: number[];

  @IsString()
  startDate!: string;

  @IsString()
  endDate!: string;
}
