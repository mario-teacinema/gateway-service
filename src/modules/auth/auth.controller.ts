import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SendOtpRequest } from "./dto";
import { ApiOperation } from "@nestjs/swagger";
import { AuthClientGrpc } from "./auth.grpc";
import { VerifyOtpRequest } from "./dto/requests/verify-otp.request";

@Controller("auth")
export class AuthController {
  public constructor(private readonly client: AuthClientGrpc) {}

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
  public async verifyOtp(@Body() dto: VerifyOtpRequest) {
    console.log("DATA: ", dto);

    return this.client.verifyOtp(dto);
  }
}
