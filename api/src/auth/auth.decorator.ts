import { SetMetadata } from '@nestjs/common';
import { EmployeeRole } from '../employee/enum/employee-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EmployeeRole[]) =>
  SetMetadata(ROLES_KEY, roles);
