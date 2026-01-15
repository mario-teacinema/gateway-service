import { RpCStatus } from "../enums";
import { HttpStatus } from "@nestjs/common";

export const grpcToHttpStatus: Record<RpCStatus, number> = {
  [RpCStatus.OK]: HttpStatus.OK,
  [RpCStatus.CANCELED]: 499,
  [RpCStatus.UNKNOWN]: HttpStatus.INTERNAL_SERVER_ERROR,
  [RpCStatus.INVALID_ARGUMENTS]: HttpStatus.BAD_REQUEST,
  [RpCStatus.DEADLINE_EXCEEDED]: HttpStatus.GATEWAY_TIMEOUT,
  [RpCStatus.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [RpCStatus.ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [RpCStatus.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
  [RpCStatus.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
  [RpCStatus.FAILED_PRECONDITION]: HttpStatus.BAD_REQUEST,
  [RpCStatus.ABORTED]: HttpStatus.CONFLICT,
  [RpCStatus.OUT_OF_RANGE]: HttpStatus.BAD_REQUEST,
  [RpCStatus.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
  [RpCStatus.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
  [RpCStatus.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
  [RpCStatus.DATA_LOSS]: HttpStatus.INTERNAL_SERVER_ERROR,
  [RpCStatus.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
};
