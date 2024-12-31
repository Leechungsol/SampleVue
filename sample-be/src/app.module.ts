import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import configuration from "./config/configuration";
import { ChartModule } from "./modules/chart/chart.module";
import { CompanyModule } from "./modules/company/company.module";
import { DeliveryModule } from "./modules/delivery/delivery.module";
import { ListModule } from "./modules/list/list.module";
import { ManufacturedModule } from "./modules/manufactured/manufactured.module";
import { RankModule } from "./modules/rank/rank.module";
import { SpecificationModule } from "./modules/specification/specification.module";
import { UnshippedModule } from "./modules/unshipped/unshipped.module";
import { UserModule } from "./modules/user/user.module";
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource } from "typeorm";

const env = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !env ? ".env" : `.env.${env}`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "mssql",
        host: configService.get<string>("database.host"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.database"),
        entities: [__dirname + "/entities/*{.ts,.js}"],
        synchronize: false,
        port: configService.get<number>("database.port"),
        options: {
          encrypt: false,
        },
        logging: true,
        migrationsRun: false,
      }),
      async dataSourceFactory(options){
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
      inject: [ConfigService],
    }),
    UserModule,
    SpecificationModule,
    ManufacturedModule,
    DeliveryModule,
    UnshippedModule,
    CompanyModule,
    ChartModule,
    ListModule,
    RankModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class ApplicationModule {}
