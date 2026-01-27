import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccountClientGrpc } from "../../modules";
import { ROLES_KEY } from "../decorators";

import { Request } from "express";
import { lastValueFrom } from "rxjs";
import { Role } from "@mario-teacinema/contracts/gen/account";

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly accountClient: AccountClientGrpc,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();

    const { user } = request;

    if (!user) throw new ForbiddenException("User context missing");

    const { id } = user;

    const account = await lastValueFrom(this.accountClient.getAccount({ id }));

    if (!account) throw new NotFoundException("Account not found");

    const { role } = account;

    if (!required.includes(role))
      throw new ForbiddenException(
        "You do not have permission to access this resource",
      );

    return true;
  }
}
