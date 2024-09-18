import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Voo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  codigo: string;

  @Column('simple-json')
  origem: {
    cep: string;
    pais: string;
    cidade: string;
    estado: string;
  };

  @Column('simple-json')
  destino: {
    cep: string;
    pais: string;
    cidade: string;
    estado: string;
  };

  @Column()
  data: Date;
}