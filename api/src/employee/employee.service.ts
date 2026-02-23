import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeDto } from './dto/employee.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async validateEmployee(email: string): Promise<Employee | null> {
    return this.employeeRepository.findOne({ where: { email } });
  }

  async create(employee: CreateEmployeeDto): Promise<{ message: string }> {
    const existingEmployee = await this.validateEmployee(employee.email);

    if (existingEmployee) {
      throw new ConflictException('An employee with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(employee.password, 10);

    const newEmployee = this.employeeRepository.create({
      ...employee,
      password: hashedPassword,
    });

    await this.employeeRepository.save(newEmployee);

    return { message: 'Employee created successfully' };
  }

  async findAll(): Promise<EmployeeDto[]> {
    const employees = await this.employeeRepository.find();
    return employees.map((employee) => ({
      id: employee.id,
      name: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
      role: employee.role,
    }));
  }
}
