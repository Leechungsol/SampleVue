import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { ChartRepository } from "./chart.repository";
import { ChartService } from "./chart.service";
import { ChartController } from "./chart.controller";

@Module({
  imports: [UserModule],
  providers: [ChartRepository, ChartService],
  controllers: [ChartController],
  exports: [ChartService],
})
export class ChartModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ChartController);
  }
}
