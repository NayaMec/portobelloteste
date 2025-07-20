import { useRef } from 'react';
import { OrderForm, type OrderFormRef } from '../../components/orderForm/orderForm';
import OrderService from '../../services/OrderService';
import { PageHeader } from '../../components/pageHeader/pageHeader';
import type { OrderDomain } from '../../services/mappers/OrderMapper';
import { toast } from '../../utils/toast';

export function CreateOrder() {
  const orderFormRef = useRef<OrderFormRef>(null);

  async function handleSubmit(order: OrderDomain) {
    try {
      await OrderService.createOrder(order);

      orderFormRef.current?.resetFields();

      toast({ type: 'success', text: 'Pedido cadastrado com sucesso' });
    } catch {
      toast({ type: 'danger', text: 'Erro ao cadastrar pedido' });
    }
  }

  return (
    <div className="container">
      <PageHeader title="Novo pedido" />
      <OrderForm ref={orderFormRef} buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </div>
  );
}
