import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // no roles required -> allow
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // If no user was attached by AuthGuard, deny access
    if (!user) {
      return false;
    }

    const userRole = (user as any).role;

    // support either a single role string or an array of roles on the user
    if (typeof userRole === 'string') {
      return requiredRoles.includes(userRole);
    }

    if (Array.isArray(userRole)) {
      return requiredRoles.some(role => userRole.includes(role));
    }

    return false;
  }
}