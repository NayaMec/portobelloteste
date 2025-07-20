import { CheckCircle, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import type { IToast } from '../../../utils/toast';
import './toastMessage.scss';

interface IToastMessageProps {
  message: IToast;
  onRemoveMessage: (messageId: number) => void;
}

export function ToastMessage({ message, onRemoveMessage }: IToastMessageProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id!);
    }, message.duration || 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id!);
  }

  return (
    <div
      className={`toast-message -${message.type}`}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <XCircle size={24} />}
      {message.type === 'success' && <CheckCircle size={24} />}
      <strong>{message.text}</strong>
    </div>
  );
}
