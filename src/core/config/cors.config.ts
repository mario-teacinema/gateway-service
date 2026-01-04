import { ConfigService } from "@nestjs/config";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const getCorsConfig = (configService: ConfigService): CorsOptions => {
  return {
    origin: configService.getOrThrow<string>("HTTP_CORS").split(","),
    credentials: true,
  };
};
