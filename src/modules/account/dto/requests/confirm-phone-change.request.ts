import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  Length,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ConfirmPhoneChangeRequest {
  @ApiProperty({
    example: "+79271234567",
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  @Matches(/^\+?\d{10,15}$/, {})
  public readonly phone: string;

  @ApiProperty({
    example: "123456",
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(6, 6)
  public code: string;
}
