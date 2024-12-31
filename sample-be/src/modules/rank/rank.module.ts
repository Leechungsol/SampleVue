import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RankWebMappingEntity } from "../../entities/rank-web-mapping.entity";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserModule } from "../user/user.module";
import { RankController } from "./rank.controller";
import { RankRepository } from "./rank.repository";
import { RankService } from "./rank.service";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([RankWebMappingEntity])],
  providers: [RankRepository, RankService],
  controllers: [RankController],
  exports: [RankService],
})
export class RankModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(RankController);
  }
}
