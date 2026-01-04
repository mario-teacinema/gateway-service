import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: "Welcome endpoint",
    description: "Returns a simple API welcome message",
  })
  @Get()
  public getHello(): { message: string } {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: "Health check",
    description: "Checks if the Gateway is running",
  })
  @Get("health")
  public getHealth(): { status: string; timestamp: string } {
    return this.appService.health();
  }
}
