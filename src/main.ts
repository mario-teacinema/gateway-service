import { NestFactory } from "@nestjs/core";
import { AppModule, getCorsConfig, getValidationPipeConfig } from "./core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { GrpcExceptionFilter } from "./shared/filters";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const logger = new Logger("Bootstrap");

  app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

  app.useGlobalFilters(new GrpcExceptionFilter());

  app.enableCors(getCorsConfig(config));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("TeaCinema API")
    .setDescription("API Gateway for TeaCinema microservices")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("/docs", app, swaggerDocument, {
    yamlDocumentUrl: "openapi.yaml",
  });

  const port = config.getOrThrow<number>("HTTP_PORT");
  const host = config.getOrThrow<number>("HTTP_HOST");

  await app.listen(port);

  logger.log(`🚀 Gateway started: ${host}`);
  logger.log(`📚 Swagger: ${host}/docs`);
}
bootstrap().then().catch(console.error);
