import { useCallback, useEffect, useMemo, useState } from 'react';
import OrderService from '../../services/OrderService';
import type { OrderDomain } from '../../services/mappers/OrderMapper';
import { Link } from 'react-router-dom';
import { Input } from '../../components/input/input';
import { Modal } from '../../components/modal/modal';
import { SearchNotFound } from './components/searchNotFound/searchNotFound';
import { EmptyList } from './components/emptyList/emptyList';
import { OrderCard } from './components/orderCard/orderCard';
import { Loader } from '../../components/loader/loader';
import './home.scss';
import { toast } from '../../utils/toast';

export function Home() {
  const [orders, setOrders] = useState<OrderDomain[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [orderBeingDeleted, setOrderBeingDeleted] = useState<OrderDomain | null>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredOrders = useMemo(
    () => orders.filter((order) => order.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [orders, searchTerm],
  );

  const loadOrders = useCallback(async () => {
    try {
      setIsLoading(true);

      const ordersList = await OrderService.listOrders();

      setOrders(ordersList);
      setHasError(false);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  function handleDeleteOrder(order: OrderDomain) {
    setIsDeleteModalVisible(true);
    setOrderBeingDeleted(order);
  }

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteOrder() {
    if (!orderBeingDeleted || !orderBeingDeleted.id) return;

    try {
      setIsLoadingDelete(true);

      await OrderService.deleteOrder(orderBeingDeleted.id);

      toast({ text: 'Pedido deletado com sucesso!', type: 'success' });
      handleCloseDeleteModal();
      setOrders((prevState) => prevState.filter((order) => order.id !== orderBeingDeleted.id));
    } catch {
      toast({ text: 'Erro ao deletar pedido!', type: 'danger' });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  if (isLoading) return <Loader isLoading={isLoading} />;

  return (
    <div className="container home">
      <div className="orders-header">
        <strong>
          {filteredOrders.length}
          {filteredOrders.length === 1 ? ' pedido' : ' pedidos'}
        </strong>

        <Link to="/create">Novo pedido</Link>
      </div>

      {orders.length > 0 && (
        <div className="search-container">
          <Input
            type="text"
            placeholder="Pesquisar pedido.."
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            maxLength={40}
          />
        </div>
      )}

      {!hasError && (
        <>
          {orders.length < 1 && !isLoading && <EmptyList />}

          {orders.length > 0 && filteredOrders.length < 1 && searchTerm.length > 0 && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <div className="cards-list">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} handleDeleteOrder={handleDeleteOrder} />
            ))}
          </div>
        </>
      )}

      <Modal
        title={`Tem certeza que deseja remover o contato "${orderBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        danger
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteOrder}
        isOpen={isDeleteModalVisible}
        isLoading={isLoadingDelete}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
    </div>
  );
}
