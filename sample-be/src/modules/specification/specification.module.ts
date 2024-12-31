import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { SpecificationController } from "./specification.controller";
import { SpecificationService } from "./specification.service";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserModule } from "../user/user.module";
import { SpecificationRepository } from "./specification.repository";

@Module({
  imports: [UserModule],
  providers: [SpecificationRepository, SpecificationService],
  controllers: [SpecificationController],
  exports: [SpecificationService],
})
export class SpecificationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(SpecificationController);
  }
}
