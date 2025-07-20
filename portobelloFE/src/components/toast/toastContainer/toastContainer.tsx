import { useCallback, useEffect, useState } from 'react';
import { toastEventManager, type IToast } from '../../../utils/toast';
import { ToastMessage } from '../toastMessage/toastMessage';
import './toastContainer.scss';

export function ToastContainer() {
  const [messages, setMessages] = useState<IToast[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }: IToast) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

  return (
    <div className="toast-container">
      {messages.map((message) => (
        <ToastMessage key={message.id} message={message} onRemoveMessage={handleRemoveMessage} />
      ))}
    </div>
  );
}
