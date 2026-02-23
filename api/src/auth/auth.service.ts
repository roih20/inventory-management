import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/employee.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async validateEmployee(email: string): Promise<Employee | null> {
    return this.employeeRepository.findOne({ where: { email } });
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const employee = await this.validateEmployee(email);

    if (!employee) throw new NotFoundException();

    const isPasswordValid = await bcrypt.compare(pass, employee.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: employee.email,
      name: `${employee.firstName} ${employee.lastName}`,
      role: employee.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
