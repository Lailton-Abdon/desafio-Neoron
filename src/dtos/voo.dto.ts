export class CreateVooDto {
  codigo: string;

  origem: {
    cep: string;
    pais: string;
    cidade: string;
    estado: string;
  };

  destino: {
    cep: string;
    pais: string;
    cidade: string;
    estado: string;
  };

  data: Date;
}

export class UpdateVooDto {
  codigo?: string;

  origem?: {
    cep?: string;
    pais?: string;
    cidade?: string;
    estado?: string;
  };

  destino?: {
    cep?: string;
    pais?: string;
    cidade?: string;
    estado?: string;
  };

  data?: Date;
}
