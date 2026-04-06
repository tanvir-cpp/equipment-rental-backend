import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';


export class CreateRentalDto {
  @IsDateString({}, { message: 'Invalid date format for startDate' })
  startDate: string;

  @IsDateString({}, { message: 'Invalid date format for endDate' })
  endDate: string;



  @IsNumber()
  @IsPositive({ message: 'Equipment ID must be a positive number' })
  equipmentId: number;
}
