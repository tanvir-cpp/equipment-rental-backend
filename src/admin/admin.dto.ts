import { IsString, IsNumber, Matches, IsNotEmpty } from 'class-validator';

export class AdminDto {

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @Matches(/^[A-Za-z]+$/, { message: 'Name must contain only alphabets' })
  name!: string;

  @IsNotEmpty({ message: 'Age is required' })
  @IsNumber()
  age!: number;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.xyz$/, {
    message: 'Invalid Email'
  })
  email!: string;


}