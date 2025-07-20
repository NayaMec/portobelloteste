import { Edit, TextSearch, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { OrderDomain } from '../../../../services/mappers/OrderMapper';
import { formatCurrency } from '../../../../utils/formatCurrency';
import './orderCard.scss';

interface IOrderCardProps {
  handleDeleteOrder: (order: OrderDomain) => void;
  order: OrderDomain;
}

export function OrderCard({ handleDeleteOrder, order }: IOrderCardProps) {
  return (
    <div className="card" key={order.id}>
      <div className="info">
        <h2 className="order-name">{order.name}</h2>

        <div className="tooltips">
          {order.type && <span>{order.type}</span>}
          {order.environment && <span>{order.environment}</span>}
          {order.status && <span>{order.status}</span>}
          {order.code && <span>{order.code}</span>}
        </div>

        <strong>{formatCurrency(order.orderValue)}</strong>
      </div>

      <div className="actions">
        <Link to={`/order/${order.id}`}>
          <TextSearch size={24} className="search" />
        </Link>

        <Link to={`/edit/${order.id}`}>
          <Edit size={24} className="edit" />
        </Link>

        <button type="button" onClick={() => handleDeleteOrder(order)}>
          <Trash size={24} className="trash" />
        </button>
      </div>
    </div>
  );
}
