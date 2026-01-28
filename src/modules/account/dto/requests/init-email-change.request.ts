import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class InitEmailChangeRequest {
  @ApiProperty({
    example: "test@test.com",
  })
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;
}
