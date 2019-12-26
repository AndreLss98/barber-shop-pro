import { cliente } from './cliente.model';

export interface conversa {
    idprofissional: number;
    idcliente: number;
    iscliente: boolean;
    texto: string;
    dthorario?: string;
}

export interface chat {
    cliente: cliente;
    conversas: conversa[]
}