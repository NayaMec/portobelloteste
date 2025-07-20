// Tipagem da estrutura de dados no banco
export interface OrderPersistence {
  id?: string;
  nome: string;
  preco: number;
  tipoProduto: string | null;
  ambiente?: string | null;
  codigo?: string | null;
  dataCriacao?: Date;
  dataAtualizacao?: Date | null;
  criadoPor: string | null;
  status: StatusPedido;
}

// Tipagem do domínio da aplicação
export interface OrderDomain {
  id?: string;
  name: string;
  orderValue: number;
  type: string | null;
  environment?: string | null;
  code?: string | null;
  createdDate?: Date;
  updatedDate?: Date | null;
  createdBy: string | null;
  status: StatusPedido;
}

// ENUM do Status do Pedido
export const StatusPedido = {
  PROCESSANDO: 'PROCESSANDO',
  ENVIADO: 'ENVIADO',
  ENTREGUE: 'ENTREGUE',
  CANCELADO: 'CANCELADO',
} as const;

export type StatusPedido = (typeof StatusPedido)[keyof typeof StatusPedido];

class OrderMapper {
  toDomain(persistence: OrderPersistence): OrderDomain {
    return {
      id: persistence.id,
      name: persistence.nome,
      orderValue: persistence.preco,
      type: persistence.tipoProduto,
      code: persistence.codigo,
      createdBy: persistence.criadoPor,
      createdDate: persistence.dataCriacao,
      updatedDate: persistence.dataAtualizacao,
      environment: persistence.ambiente,
      status: persistence.status,
    };
  }

  toPersistence(domain: OrderDomain): OrderPersistence | null {
    return {
      id: domain.id,
      nome: domain.name,
      preco: domain.orderValue,
      tipoProduto: domain.type,
      ambiente: domain.environment,
      codigo: domain.code,
      dataCriacao: domain.createdDate,
      dataAtualizacao: domain.updatedDate,
      criadoPor: domain.createdBy,
      status: domain.status,
    };
  }
}

export default new OrderMapper();
