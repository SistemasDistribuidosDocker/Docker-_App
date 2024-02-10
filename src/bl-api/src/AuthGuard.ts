import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { SetMetadata } from '@nestjs/common';

export const Role = (role: RolesEnum) => SetMetadata('role', role);

export enum RolesEnum {
  ADMIN = 'Admin',
  VIEWER = 'View',
  EDIT = 'Edit'
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private httpService: HttpService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const requiredRole = this.getRequiredRoles(context);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const res = await this.httpService.get("http://localhost:8080/api/verify_token", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).toPromise()

      const data = res.data as any;

      switch (data?.role) {
        case RolesEnum.ADMIN:
          return requiredRole === RolesEnum.ADMIN || requiredRole === RolesEnum.EDIT || requiredRole === RolesEnum.VIEWER
        case RolesEnum.EDIT:
          return requiredRole === RolesEnum.EDIT || requiredRole === RolesEnum.VIEWER
        case RolesEnum.VIEWER:
          return requiredRole === RolesEnum.VIEWER
        default: throw new UnauthorizedException();
      }
    }
    catch (e) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getRequiredRoles(context: ExecutionContext): RolesEnum {
    // Extract required roles from metadata
    const requiredRoles = Reflect.getMetadata('role', context.getHandler());
    if (!requiredRoles) {
      return undefined; // No roles specified, return an empty array
    }
    return requiredRoles;
  }
}