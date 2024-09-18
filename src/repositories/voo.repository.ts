import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateVooDto, UpdateVooDto } from "src/dtos/voo.dto";
import { Voo } from "src/entities/voo.entity";
import { Repository } from "typeorm";

@Injectable()
export class VooRepository {
    constructor(
        @InjectRepository(Voo)
        private readonly vooRepository: Repository<Voo>,
    ) { }

    // Função para criar um novo voo
    async create(createVooDto: CreateVooDto): Promise<Voo> {
        const voo = this.vooRepository.create(createVooDto);
        return await this.vooRepository.save(voo);
    }

    async findAll(): Promise<Voo[]> {
        return await this.vooRepository.find();
    }

    async findOne(id: string): Promise<Voo> {
        const voo = await this.vooRepository.findOneBy({ id });
        if (!voo) {
            throw new Error(`Voo com ID ${id} não encontrado.`);
        }
        return voo;
    }

    // Função para atualizar um voo
    async update(id: string, updateVooDto: UpdateVooDto): Promise<Voo> {
        const voo = await this.vooRepository.preload({
            id,
            ...updateVooDto,
        });
        if (!voo) {
            throw new Error(`Voo com ID ${id} não encontrado.`);
        }
        return this.vooRepository.save(voo);
    }

    // Função para deletar um voo
    async remove(id: string): Promise<void> {
        const result = await this.vooRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Voo com ID ${id} não encontrado.`);
        }
    }
}