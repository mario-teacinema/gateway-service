import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
  ConfirmEmailChangeRequest,
  ConfirmPhoneChangeRequest,
  InitEmailChangeRequest,
  InitPhoneChangeRequest,
} from "./dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AccountClientGrpc } from "./account.grpc";
import { CurrentUserDecorator, Protected } from "../../shared/decorators";

@Controller("account")
export class AccountController {
  public constructor(private readonly client: AccountClientGrpc) {}

  @ApiOperation({
    summary: "Init email change",
    description: "Sends confirmation code to a new email address",
  })
  @ApiBearerAuth()
  @Protected()
  @Post("email/init")
  @HttpCode(HttpStatus.OK)
  public async initEmailChange(
    @Body() dto: InitEmailChangeRequest,
    @CurrentUserDecorator() userId: string,
  ) {
    return this.client.initEmailChange({
      ...dto,
      userId,
    });
  }

  @ApiOperation({
    summary: "Confirm email change",
    description: "Verifies confirmation code and updates user email",
  })
  @ApiBearerAuth()
  @Protected()
  @Post("email/confirm")
  @HttpCode(HttpStatus.OK)
  public async confirmEmailChange(
    @Body() dto: ConfirmEmailChangeRequest,
    @CurrentUserDecorator() userId: string,
  ) {
    return this.client.confirmEmailChange({
      ...dto,
      userId,
    });
  }

  @ApiOperation({
    summary: "Init phone change",
    description: "Sends confirmation code to a new phone number",
  })
  @ApiBearerAuth()
  @Protected()
  @Post("phone/init")
  @HttpCode(HttpStatus.OK)
  public async initPhoneChange(
    @Body() dto: InitPhoneChangeRequest,
    @CurrentUserDecorator() userId: string,
  ) {
    return this.client.initPhoneChange({
      ...dto,
      userId,
    });
  }

  @ApiOperation({
    summary: "Confirm phone change",
    description: "Verifies confirmation code and updates user phone number",
  })
  @ApiBearerAuth()
  @Protected()
  @Post("phone/confirm")
  @HttpCode(HttpStatus.OK)
  public async confirmPhoneChange(
    @Body() dto: ConfirmPhoneChangeRequest,
    @CurrentUserDecorator() userId: string,
  ) {
    return this.client.confirmPhoneChange({
      ...dto,
      userId,
    });
  }
}
