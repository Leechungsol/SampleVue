import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserModule } from "../user/user.module";
import { ManufacturedController } from "./manufactured.controller";
import { ManufacturedRepository } from "./manufactured.repository";
import { ManufacturedService } from "./manufactured.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MouldedWarehousingEntity } from "../../entities/moulded-warehousing.entity";
import { MouldedShipmentEntity } from "../../entities/moulded-shipment.entity";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([MouldedWarehousingEntity, MouldedShipmentEntity]),
  ],
  providers: [ManufacturedRepository, ManufacturedService],
  controllers: [ManufacturedController],
  exports: [ManufacturedService],
})
export class ManufacturedModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ManufacturedController);
  }
}
