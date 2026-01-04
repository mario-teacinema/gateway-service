import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  public getHello(): { message: string } {
    return {
      message: "Welcome",
    };
  }

  public health(): { status: string; timestamp: string } {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
