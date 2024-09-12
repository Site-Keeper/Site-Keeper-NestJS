import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PermissionJWT, UserJWT } from 'src/common/interfaces/jwt.interface';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is not found');
    }

    try {
      const payload: UserJWT = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      let permissions = this.reflector.get<string[]>(
        'permissions',
        context.getHandler()
      );
      let entity = this.reflector.get<string[]>('entity', context.getHandler());

      if (!permissions && !entity) {
        permissions = [request.body.permissions];
        entity = [request.body.entity];
      }

      if (permissions && entity) {
        const validEntities = [
          'routines',
          'tasks',
          'reports',
          'spaces',
          'objects',
          'lostObjects',
          'users',
        ];

        const validPermissions = [
          'can_create',
          'can_update',
          'can_delete',
          'can_read',
        ];

        if (!validPermissions.includes(permissions[0])) {
          throw new UnauthorizedException(
            `[${permissions[0]}] is an invalid permission`
          );
        }

        if (!validEntities.includes(entity[0])) {
          throw new UnauthorizedException(
            `[${entity[0]}] is an invalid entity`
          );
        }
        const userPermissions = payload.role.permissions;

        const entityPermissions = userPermissions.find(
          (permission: PermissionJWT) => {
            return permission.entity === entity[0];
          }
        );

        if (!entityPermissions || !entityPermissions[permissions[0]]) {
          throw new UnauthorizedException(
            `The role '${payload.role.name}' does not have permission for (${permissions}) in the entity: ${entity}.`
          );
        }
      }

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
