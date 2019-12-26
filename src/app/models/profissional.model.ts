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
}