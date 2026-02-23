import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { Roles } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { EmployeeRole } from './enum/employee-role.enum';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Throttle } from '@nestjs/throttler';
import { EmployeeDto } from './dto/employee.dto';

@UseGuards(AuthGuard)
@Throttle({ default: {} })
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @Roles(EmployeeRole.ADMIN, EmployeeRole.MANAGER)
  createEmployee(
    @Body() employee: CreateEmployeeDto,
  ): Promise<{ message: string }> {
    return this.employeeService.create(employee);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  @Roles(EmployeeRole.ADMIN, EmployeeRole.MANAGER)
  findAll(): Promise<EmployeeDto[]> {
    return this.employeeService.findAll();
  }
}
