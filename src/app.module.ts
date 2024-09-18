import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "./config/ormconfig";
import { VooModule } from "./modules/voo.module";

@Module({
  imports: [TypeOrmModule.forRoot(config), VooModule],
  controllers: [],
  providers: [],
})
export class AppModule { }