import { ConfigService } from "@nestjs/config";
import { PassportOptions } from "@mario-teacinema/passport";

export const passportConfigLoader = (
  configService: ConfigService,
): PassportOptions => {
  return {
    secretKey: configService.getOrThrow<string>("PASSPORT_SECRET_KEY") ?? "",
  };
};
