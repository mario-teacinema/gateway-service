import { IsEmail, IsNotEmpty, IsNumberString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ConfirmEmailChangeRequest {
  @ApiProperty({
    example: "test@test.com",
  })
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({
    example: "123456",
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(6, 6)
  public code: string;
}
