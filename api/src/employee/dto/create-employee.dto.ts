import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { EmployeeRole } from '../enum/employee-role.enum';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;
  @IsNotEmpty()
  @IsEnum(EmployeeRole)
  role: EmployeeRole;
}
