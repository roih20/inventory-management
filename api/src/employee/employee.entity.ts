import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeRole } from './enum/employee-role.enum';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  firstName: string;

  @Column({ length: 50, nullable: false })
  lastName: string;

  @Column({ unique: true, length: 100, nullable: false })
  email: string;

  @Column({ type: 'enum', enum: EmployeeRole, default: EmployeeRole.STAFF })
  role: EmployeeRole;

  @Column({ nullable: false })
  password: string;
}
