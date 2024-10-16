import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLE_KEY } from '@/domains/auth/decorators/roles.decorator';
import { Role } from '@/domains/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		const user = context.switchToHttp().getRequest().user;
		const hasRequiredRole = requiredRoles.some((role) => user.role == role);

		return hasRequiredRole;
	}
}
