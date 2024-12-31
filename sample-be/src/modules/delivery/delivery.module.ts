import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { DeliveryRepository } from "./delivery.repository";
import { DeliveryService } from "./delivery.service";
import { DeliveryController } from "./delivery.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

@Module({
  imports: [UserModule],
  providers: [DeliveryRepository, DeliveryService],
  controllers: [DeliveryController],
  exports: [DeliveryService],
})
export class DeliveryModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DeliveryController);
  }
}
