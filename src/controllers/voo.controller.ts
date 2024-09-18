import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateVooDto, UpdateVooDto } from "src/dtos/voo.dto";
import { Voo } from "src/entities/voo.entity";
import { VooService } from "src/services/voo.service";

@Controller('voos')
export class VooController {
  constructor(private readonly vooService: VooService) { }

  // Endpoint para criar um novo voo
  @Post()
  async create(@Body() createVooDto: CreateVooDto): Promise<Voo> {
    return this.vooService.create(createVooDto);
  }

  @Get()
  async findAll(): Promise<Voo[]> {
    return this.vooService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Voo> {
    return this.vooService.findOne(id);
  }

  // Endpoint para atualizar um voo
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVooDto: UpdateVooDto): Promise<Voo> {
    return this.vooService.update(id, updateVooDto);
  }

  // Endpoint para deletar um voo
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.vooService.remove(id);
  }
}