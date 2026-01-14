import { Inject, Injectable, OnModuleInit } from "@nestjs/common";

import { AuthServiceClient } from "@mario-teacinema/contracts/gen/auth";
import type { ClientGrpc } from "@nestjs/microservices";
import { SendOtpRequest } from "./dto";
import { VerifyOtpRequest } from "./dto/requests/verify-otp.request";

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
  private authService: AuthServiceClient;

  public constructor(
    @Inject("AUTH_PACKAGE") private readonly client: ClientGrpc,
  ) {}

  public onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>("AuthService");
  }

  public sendOtp(request: SendOtpRequest) {
    return this.authService.sendOtp(request);
  }

  public verifyOtp(request: VerifyOtpRequest) {
    return this.authService.verifyOtp(request);
  }
}
