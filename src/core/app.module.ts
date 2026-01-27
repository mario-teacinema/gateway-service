import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AccountModule, AuthModule } from "../modules";
import { PassportModule } from "@mario-teacinema/passport";
import { passportConfigLoader } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    PassportModule.registerAsync({
      useFactory: passportConfigLoader,
      inject: [ConfigService],
    }),
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
