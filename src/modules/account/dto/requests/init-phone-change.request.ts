import { IsNotEmpty, IsPhoneNumber, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class InitPhoneChangeRequest {
  @ApiProperty({
    example: "+79271234567",
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  @Matches(/^\+?\d{10,15}$/, {})
  public readonly phone: string;
}
