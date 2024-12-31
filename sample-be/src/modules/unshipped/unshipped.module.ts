import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UnshippedRepository } from "./unshipped.repository";
import { UnshippedService } from "./unshipped.service";
import { UnshippedController } from "./unshipped.controller";

@Module({
  imports: [UserModule],
  providers: [UnshippedRepository, UnshippedService],
  controllers: [UnshippedController],
  exports: [UnshippedService],
})
export class UnshippedModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UnshippedController);
  }
}
