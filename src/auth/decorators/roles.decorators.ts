import { SetMetadata } from '@nestjs/common';
import UserType from '../enums/userRoles.enum';

export const ROLE_KEY = 'roles';

export const Roles = (...roles: UserType[]) => SetMetadata(ROLE_KEY, roles);
