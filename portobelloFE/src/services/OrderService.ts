import OrderMapper, { type OrderDomain, type OrderPersistence } from './mappers/OrderMapper';
import HttpClient from './utils/HttpClient';

const basePath = '/api/pedidos';

class OrderService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:8080');
  }

  async listOrders(): Promise<OrderDomain[]> {
    const orders = await this.httpClient.get<OrderPersistence[]>(basePath);
    return orders.map(OrderMapper.toDomain);
  }

  createOrder(order: OrderDomain) {
    const body = OrderMapper.toPersistence(order);

    return this.httpClient.post(basePath, { body });
  }

  updateOrder(id: string, order: OrderDomain) {
    const body = OrderMapper.toPersistence(order);
    return this.httpClient.put(`${basePath}/${id}`, { body });
  }

  async getOrderById(id: string): Promise<OrderDomain> {
    const order = await this.httpClient.get<OrderPersistence>(`${basePath}/${id}`);
    return OrderMapper.toDomain(order);
  }

  deleteOrder(id: string) {
    return this.httpClient.delete(`${basePath}/${id}`);
  }
}

export default new OrderService();
