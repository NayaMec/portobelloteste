import { useEffect, useState } from 'react';
import OrderService from '../../services/OrderService';
import { toast } from '../../utils/toast';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../components/loader/loader';
import type { OrderDomain } from '../../services/mappers/OrderMapper';
import { formatCurrency } from '../../utils/formatCurrency';
import { PageHeader } from '../../components/pageHeader/pageHeader';
import './detailedOrder.scss';

function Info({ title, value = null }: { title: string; value: any }) {
  if (!value) return null;

  return (
    <div className="detailed-info">
      <strong>{title}</strong>
      <span>{value}</span>
    </div>
  );
}

export function DetailedOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDomain | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function loadOrder() {
      if (!id) {
        toast({ text: 'Erro ao carregar o pedido.', type: 'danger' });
        return;
      }

      try {
        const order = await OrderService.getOrderById(id);

        setIsLoading(false);
        setOrder(order);
      } catch {
        toast({ text: 'Erro ao carregar o pedido.', type: 'danger' });
      }
    }

    loadOrder();
  }, [id]);

  return (
    <div className="detailed-order container">
      <PageHeader title={order?.name || ''} />

      <div className="infos">
        <Info title="Preço:" value={formatCurrency(order?.orderValue || null)} />
        <Info title="Código:" value={order?.code} />
        <Info title="Tipo:" value={order?.type} />
        <Info title="Criado por:" value={order?.createdBy} />
        <Info title="Status:" value={order?.status} />
        <Info title="Ambiente:" value={order?.environment} />
        <Info
          title="Data de criação:"
          value={order?.createdDate && new Date(order?.createdDate).toLocaleDateString()}
        />
        <Info
          title="Data de atualização:"
          value={order?.updatedDate && new Date(order?.updatedDate).toLocaleDateString()}
        />
      </div>

      <Link to={`/edit/${order?.id}`} className="custom-button">
        Editar
      </Link>

      <Loader isLoading={isLoading} />
    </div>
  );
}
