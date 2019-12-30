import { pagamento } from './pagamento';

interface diasTrabalho {
    domingo: boolean;
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
}

export interface telefone {
    ddd: number;
    numero: string;
}

export interface endereco {
    endereco: string;
    complemento: string;
    numero: number;
    pto_referencia: string;
}

export interface valorServico {
    idtiposervico: number;
    valor: number;
}

export interface contaBancaria {
    idcontabancaria: number;
    agencia: number;
    contacorrente: number;
    banco: string;
    nome: string;
    cnpj: string;
}

export interface profissional {
    idprofissional: number;
    nome: string;
    sobrenome: string;
    email: string;
    urlImagemperfil: string;
    latitude: number;
    longitude: number;
    divida: number;
    total_receber: number;
    media_avaliacao: number;
    telefones: telefone[];
    endereco: endereco;
    diasTrabalho: diasTrabalho;
    valores: valorServico[];
    contabancaria: contaBancaria;
    pagamentos: pagamento[];
}