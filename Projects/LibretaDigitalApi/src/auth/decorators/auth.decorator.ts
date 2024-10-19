import { applyDecorators, UseGuards } from '@nestjs/common';
import { Rol } from '../../common/enums/rol.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(roles: Rol | Rol[]) {
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard)
);
}
