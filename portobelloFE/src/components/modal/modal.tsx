import type { ReactNode } from 'react';
import { Button } from '../button/button';
import { ReactPortal } from '../reactPortal';
import './modal.scss';

interface IModalProps {
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  children: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  isLoading: boolean;
}

export function Modal({
  title,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false,
  children,
  onCancel,
  onConfirm,
  isOpen,
  isLoading = false,
}: IModalProps) {
  if (!isOpen) return null;

  return (
    <ReactPortal containerId="modal-root">
      <div className="overlay">
        <main className={`modal-content ${danger && '-danger'}`}>
          <h1 className="title">{title}</h1>

          <div className="modal-body">{children}</div>

          <footer className="buttons-container">
            <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </button>

            <Button type="button" danger={danger} onClick={onConfirm} isLoading={isLoading}>
              {confirmLabel}
            </Button>
          </footer>
        </main>
      </div>
    </ReactPortal>
  );
}
