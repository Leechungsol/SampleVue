import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserModule } from "../user/user.module";
import { ListController } from "./list.controller";
import { ListRepository } from "./list.repository";
import { ListService } from "./list.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../../entities/product.entity";
import { PartsTypeEntity } from "../../entities/parts-type.entity";
import { PartsColorEntity } from "../../entities/parts-color.entity";
import { PartsUseEntity } from "../../entities/parts-use.entity";
import { CompClassifyEntity } from "../../entities/comp-classify.entity";
import { ProcessEntity } from "../../entities/process.entity";
import { MachineEntity } from "../../entities/machine.entity";
import { CompanyEntity } from "../../entities/company.entity";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      ProductEntity,
      PartsTypeEntity,
      PartsColorEntity,
      PartsUseEntity,
      CompClassifyEntity,
      ProcessEntity,
      MachineEntity,
      CompanyEntity,
    ]),
  ],
  providers: [ListRepository, ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ListController);
  }
}
