import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

export function PrivateService() {
  return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth('access-token'));
}

export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

export const toTheEntity = (...entity: string[]) =>
  SetMetadata('entity', entity);

export const Role = (role: string[]) => SetMetadata('role', role);
