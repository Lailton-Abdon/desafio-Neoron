import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateVooDto, UpdateVooDto } from "src/dtos/voo.dto";
import { Voo } from "src/entities/voo.entity";
import { Repository } from "typeorm";

@Injectable()
export class VooService {
  constructor(
    @InjectRepository(Voo)
    private readonly vooRepository: Repository<Voo>,
  ) { }

  // Função para criar um novo voo
  async create(createVooDto: CreateVooDto): Promise<Voo> {
    const { data, destino } = createVooDto;

    // Verifica se há voos com a mesma origem/destino e dentro do intervalo de 30 minutos
    await this.validateFlightTime(data);

    // Verifica se há outro voo para o mesmo destino no mesmo dia
    await this.validateUniqueDestinationPerDay(destino, data);

    const voo = this.vooRepository.create(createVooDto);
    return await this.vooRepository.save(voo);
  }

  // Função para atualizar um voo existente
  async update(id: string, updateVooDto: UpdateVooDto): Promise<Voo> {
    const existingVoo = await this.vooRepository.findOneBy({ id });
    if (!existingVoo) {
      throw new NotFoundException(`Voo com ID ${id} não encontrado.`);
    }

    const updatedVoo = { ...existingVoo, ...updateVooDto };

    // Verificar se há voos existentes com a mesma origem/destino e dentro do intervalo de 30 minutos
    await this.validateFlightTime(updatedVoo.data, id);

    // Verificar se há outro voo para o mesmo destino no mesmo dia
    if (updateVooDto.destino || updateVooDto.data) {
      await this.validateUniqueDestinationPerDay(
        updateVooDto.destino || existingVoo.destino,
        updateVooDto.data || existingVoo.data,
        id
      );
    }

    return this.vooRepository.save(updatedVoo);
  }

  private async validateFlightTime(newDate: Date, id?: string): Promise<void> {
    const allVoos = await this.vooRepository.find();
    const date = new Date(newDate);

    for (const voo of allVoos) {
      if (voo.id === id) continue; // Ignorar o voo atual se estiver atualizando

      const vooDate = new Date(voo.data);
      const timeDifference = Math.abs(date.getTime() - vooDate.getTime());
      const minutesDifference = timeDifference / (1000 * 60);

      if (minutesDifference < 30) {
        throw new ConflictException('O voo deve ter no mínimo 30 minutos de diferença de outros voos.');
      }
    }
  }

  private async validateUniqueDestinationPerDay(destino: any, newDate: Date, id?: string): Promise<void> {
    const allVoos = await this.vooRepository.find();
    const date = new Date(newDate).toISOString().split('T')[0]; // Formatar a data para comparar apenas o dia

    for (const voo of allVoos) {
      if (voo.id === id) continue; // Ignorar o voo atual se estiver atualizando

      const vooDate = new Date(voo.data).toISOString().split('T')[0];
      if (vooDate === date && voo.destino.cep === destino.cep) {
        throw new ConflictException('Já existe um voo para o mesmo destino no mesmo dia.');
      }
    }
  }

  async findAll(): Promise<Voo[]> {
    return await this.vooRepository.find();
  }

  async findOne(id: string): Promise<Voo> {
    const voo = await this.vooRepository.findOneBy({ id });
    if (!voo) {
      throw new NotFoundException(`Voo com ID ${id} não encontrado.`);
    }
    return voo;
  }

  async remove(id: string): Promise<void> {
    const result = await this.vooRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Voo com ID ${id} não encontrado.`);
    }
  }
}