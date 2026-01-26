import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { SendOtpRequest } from "./dto";
import { ApiOperation } from "@nestjs/swagger";
import { AuthClientGrpc } from "./auth.grpc";
import { VerifyOtpRequest } from "./dto/requests/verify-otp.request";
import { Response } from "express";
import { lastValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  public constructor(
    private readonly client: AuthClientGrpc,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: "Send otp code",
    description: "Sends a verification code to the user phone number or email",
  })
  @Post("otp/send")
  @HttpCode(HttpStatus.OK)
  public async sendOtp(@Body() dto: SendOtpRequest) {
    console.log("DATA: ", dto);

    return this.client.sendOtp(dto);
  }

  @ApiOperation({
    summary: "Verify otp code",
    description:
      "Verify the code sent to the user phone number or email and returns a access token",
  })
  @Post("otp/verify")
  @HttpCode(HttpStatus.OK)
  public async verifyOtp(
    @Body() dto: VerifyOtpRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await lastValueFrom(
      this.client.verifyOtp(dto),
    );

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>("NODE_ENV") === "production",
      domain: this.configService.get<string>("COOKIES_DOMAIN"),
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }
}
