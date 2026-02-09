import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TelegramVerifyRequest {
  @ApiProperty({
    example: "1234567890",
  })
  @IsString()
  @IsNotEmpty()
  public readonly tgAuthResult: string;
}
