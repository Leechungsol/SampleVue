import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserModule } from "../user/user.module";
import { CompanyController } from "./company.controller";
import { CompanyRepository } from "./company.repository";
import { CompanyService } from "./company.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyEntity } from "../../entities/company.entity";
import { CompanyImageEntity } from "../../entities/company-image.entity";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([CompanyEntity, CompanyImageEntity]),
  ],
  providers: [CompanyRepository, CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CompanyController);
  }
}
