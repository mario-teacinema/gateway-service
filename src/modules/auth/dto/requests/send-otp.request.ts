import { IsEnum, IsString, Validate } from "class-validator";
import { IdentifierValidator } from "../../../../shared";
import { ApiProperty } from "@nestjs/swagger";

export class SendOtpRequest {
  @ApiProperty({
    example: "+79271234567",
  })
  @IsString()
  @Validate(IdentifierValidator)
  public identifier: string;

  @ApiProperty({
    example: "phone",
    enum: ["phone", "email"],
  })
  @IsEnum(["phone", "email"])
  public type: "phone" | "email";
}
