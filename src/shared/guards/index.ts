import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { PassportService } from "@mario-teacinema/passport";

export class AuthGuard implements CanActivate {
  public constructor(private readonly passportService: PassportService) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    const result = this.passportService.verify(token);
    const { valid, userId } = result;

    if (!valid) throw new UnauthorizedException(result.reason);

    // @ts-expect-error
    request.user = {
      id: userId,
    };

    return true;
  }

  private extractToken(request: Request): string {
    const header = request.headers.authorization;

    if (!header)
      throw new UnauthorizedException("Authorization header missing");

    if (!header.startsWith("Bearer "))
      throw new UnauthorizedException("Invalid Authorization header");

    const token = header.replace("Bearer ", "");

    if (!token) throw new UnauthorizedException("Token empty");

    return token;
  }
}
