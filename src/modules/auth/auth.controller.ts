import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { SendOtpRequest } from "./dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthClientGrpc } from "./auth.grpc";
import { VerifyOtpRequest } from "./dto/requests/verify-otp.request";
import { Response } from "express";
import { lastValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Protected } from "../../shared/decorators";

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

  @ApiOperation({
    summary: "Logout",
    description: "Clears the refresh token cookie and logs the user out",
  })
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  public async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = (request.cookies["refreshToken"] ?? "") as string;

    const { accessToken, refreshToken: newRefreshToken } = await lastValueFrom(
      this.client.refresh({ refreshToken }),
    );

    response.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>("NODE_ENV") === "production",
      domain: this.configService.get<string>("COOKIES_DOMAIN"),
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @ApiOperation({
    summary: "Logout",
    description: "Remove token from cookies",
  })
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  public async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie("refreshToken", "", {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>("NODE_ENV") === "production",
      domain: this.configService.get<string>("COOKIES_DOMAIN"),
      sameSite: "lax",
      expires: new Date(0),
    });

    return { ok: true };
  }

  @ApiBearerAuth()
  @Protected()
  @Get("account")
  public getAccount() {
    return { message: "OK" };
  }
}
