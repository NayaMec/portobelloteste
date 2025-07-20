import { useEffect, useRef, useState } from 'react';
import { OrderForm, type OrderFormRef } from '../../components/orderForm/orderForm';
import OrderService from '../../services/OrderService';
import { PageHeader } from '../../components/pageHeader/pageHeader';
import type { OrderDomain } from '../../services/mappers/OrderMapper';
import { toast } from '../../utils/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/loader/loader';

export function EditOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderName, setOrderName] = useState('');
  const orderFormRef = useRef<OrderFormRef>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(order: OrderDomain) {
    if (!order.id) {
      toast({ type: 'danger', text: 'Erro ao editar pedido' });
      return;
    }

    try {
      await OrderService.updateOrder(order.id, order);

      toast({ type: 'success', text: 'Pedido editado com sucesso' });
    } catch {
      toast({ type: 'danger', text: 'Erro ao editar pedido' });
    }
  }

  useEffect(() => {
    async function loadOrder() {
      if (!id) {
        toast({ text: 'Erro ao carregar o pedido.', type: 'danger' });
        return;
      }

      try {
        const order = await OrderService.getOrderById(id);

        orderFormRef.current?.setFieldsValues(order);
        setIsLoading(false);
        setOrderName(order.name);
      } catch {
        navigate('/');
        toast({ text: 'Erro ao carregar o pedido.', type: 'danger' });
      }
    }

    loadOrder();
  }, [id]);

  return (
    <div className="container">
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${orderName}`} />
      <OrderForm ref={orderFormRef} buttonLabel="Salvar" onSubmit={handleSubmit} />
    </div>
  );
}
