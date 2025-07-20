import { forwardRef, useImperativeHandle, useState, type FormEvent } from 'react';
import { useErrors } from '../../hooks/useError';
import type { OrderDomain } from '../../services/mappers/OrderMapper';
import { StatusPedido } from '../../services/mappers/OrderMapper';
import { Button } from '../button/button';
import { FormGroup } from '../formGroup/formGroup';
import { Input } from '../input/input';
import {
  formatCurrency,
  inputCurrencyFormat,
  parseCurrencyToNumber,
} from '../../utils/formatCurrency';
import { Select } from '../select/select';
import './orderForm.scss';

interface OrderFormProps {
  buttonLabel: string;
  onSubmit: (order: OrderDomain) => Promise<void>;
}

export interface OrderFormRef {
  setFieldsValues: (order: OrderDomain) => void;
  resetFields: () => void;
}

export const OrderForm = forwardRef<OrderFormRef, OrderFormProps>(
  ({ buttonLabel, onSubmit }, ref) => {
    const { getErrorMessageByFieldName, removeError, setError, errors } = useErrors();

    const [id, setId] = useState<string | undefined>(undefined);
    const [name, setName] = useState('');
    const [orderValue, setOrderValue] = useState('');
    const [type, setType] = useState<string | null>(null);
    const [environment, setEnvironment] = useState<string | null>(null);
    const [code, setCode] = useState<string | null>(null);
    const [createdBy, setCreatedBy] = useState<string | null>(null);
    const [status, setStatus] = useState<keyof typeof StatusPedido>('PROCESSANDO');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = name.trim() && orderValue && createdBy && type && errors.length === 0;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setIsSubmitting(true);

      const order: OrderDomain = {
        id,
        name,
        orderValue: parseCurrencyToNumber(orderValue),
        type,
        environment,
        code,
        createdBy,
        status: StatusPedido[status],
      };

      onSubmit(order).finally(() => setIsSubmitting(false));
    }

    useImperativeHandle(
      ref,
      () => ({
        setFieldsValues(order: OrderDomain) {
          setId(order.id);
          setName(order.name || '');
          setOrderValue(formatCurrency(order.orderValue) || '');
          setType(order.type ?? null);
          setEnvironment(order.environment ?? null);
          setCode(order.code ?? null);
          setCreatedBy(order.createdBy ?? null);
          setStatus(order.status || 'PROCESSANDO');
        },
        resetFields() {
          setId(undefined);
          setName('');
          setOrderValue('');
          setType(null);
          setEnvironment(null);
          setCode(null);
          setCreatedBy(null);
          setStatus('PROCESSANDO');
        },
      }),
      [],
    );

    return (
      <form className="order-form" onSubmit={handleSubmit} noValidate>
        <div className="form-content">
          <FormGroup error={getErrorMessageByFieldName('name')}>
            <label htmlFor="name">Nome do pedido *</label>
            <Input
              placeholder="Nome do pedido *"
              id="name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);
                if (!value.trim()) {
                  setError({ field: 'name', message: 'Nome do pedido é obrigatório' });
                } else {
                  removeError('name');
                }
              }}
              error={getErrorMessageByFieldName('name')}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup error={getErrorMessageByFieldName('price')}>
            <label htmlFor="order-value">Valor do pedido *</label>
            <Input
              placeholder="Valor do pedido (R$) *"
              id="order-value"
              value={orderValue}
              onChange={(e) => {
                const value = inputCurrencyFormat(e.target.value);
                setOrderValue(value);
                if (!value) {
                  setError({ field: 'price', message: 'Valor do pedido é obrigatório' });
                } else {
                  removeError('price');
                }
              }}
              error={getErrorMessageByFieldName('price')}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup error={getErrorMessageByFieldName('type')}>
            <label htmlFor="type">Tipo do produto *</label>
            <Input
              placeholder="Tipo do produto *"
              id="type"
              value={type ?? ''}
              onChange={(e) => {
                const value = e.target.value;

                setType(value);

                if (!value) {
                  setError({ field: 'type', message: 'Tipo do produto é obrigatório' });
                } else {
                  removeError('type');
                }
              }}
              disabled={isSubmitting}
              error={getErrorMessageByFieldName('type')}
            />
          </FormGroup>

          <FormGroup error={getErrorMessageByFieldName('createdBy')}>
            <label htmlFor="created-by">Criado por *</label>
            <Input
              placeholder="Criado por *"
              id="created-by"
              value={createdBy ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                setCreatedBy(value || null);
                if (!value.trim()) {
                  setError({ field: 'createdBy', message: 'Criado por é obrigatório' });
                } else {
                  removeError('createdBy');
                }
              }}
              error={getErrorMessageByFieldName('createdBy')}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="code">Código</label>
            <Input
              placeholder="Código"
              id="code"
              value={code ?? ''}
              onChange={(e) => setCode(e.target.value || null)}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="environment">Ambiente</label>
            <Input
              placeholder="Ambiente"
              id="environment"
              value={environment ?? ''}
              onChange={(e) => setEnvironment(e.target.value || null)}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="status">Status</label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as keyof typeof StatusPedido)}
              disabled={isSubmitting}
              id="status"
            >
              {Object.keys(StatusPedido).map((key) => (
                <option key={key} value={key}>
                  {StatusPedido[key as keyof typeof StatusPedido]}
                </option>
              ))}
            </Select>
          </FormGroup>
        </div>

        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </form>
    );
  },
);
