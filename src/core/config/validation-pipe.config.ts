import { ValidationPipeOptions } from "@nestjs/common";

export const getValidationPipeConfig = (): ValidationPipeOptions => {
  return {
    transform: true,
    whitelist: true,
  };
};
