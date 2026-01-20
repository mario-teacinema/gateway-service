import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { grpcToHttpStatus } from "../utils";

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (this.isGrpcError(exception)) {
      const httpStatus =
        grpcToHttpStatus[exception.code] ?? HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(httpStatus).json({
        statusCode: httpStatus,
        message: exception.details,
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      response.status(status).json(exceptionResponse);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
      });
    }
  }

  private isGrpcError(exception: any): boolean {
    return (
      exception &&
      typeof exception.code === "number" &&
      typeof exception.details === "string" &&
      "metadata" in exception
    );
  }
}
