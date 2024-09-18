export interface Voo {
    id: string;
    codigo: string;
    origem: string;
    destino: string;
    data: Date;
}

export interface VooState {
    voos: Voo[];
}
