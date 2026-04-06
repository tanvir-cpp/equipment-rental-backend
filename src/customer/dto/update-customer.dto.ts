import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

// partial type for update customer, all fields are optional
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
