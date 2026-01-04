import { ApiProperty } from "@nestjs/swagger";

export class HealthResponse {
  @ApiProperty({
    example: "ok",
  })
  public status: string;

  @ApiProperty({
    example: "2026-01-04T12:14:06.947Z",
  })
  public timestamp: string;
}
