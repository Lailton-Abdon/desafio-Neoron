import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VooController } from "src/controllers/voo.controller";
import { Voo } from "src/entities/voo.entity";
import { VooService } from "src/services/voo.service";

@Module({
  imports: [TypeOrmModule.forFeature([Voo])],
  controllers: [VooController],
  providers: [VooService],
})
export class VooModule {}