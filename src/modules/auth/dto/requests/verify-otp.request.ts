import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  Validate,
} from "class-validator";
import { IdentifierValidator } from "../../../../shared";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpRequest {
  @ApiProperty({
    example: "+79271234567",
  })
  @IsString()
  @Validate(IdentifierValidator)
  public identifier: string;

  @ApiProperty({
    example: "123456",
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(6, 6)
  public code: string;

  @ApiProperty({
    example: "phone",
    enum: ["phone", "email"],
  })
  @IsEnum(["phone", "email"])
  public type: "phone" | "email";
}
