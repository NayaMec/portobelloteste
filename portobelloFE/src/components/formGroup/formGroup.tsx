import { Spinner } from '../spinner/spinner';
import type { ReactNode } from 'react';
import './formGroup.scss';

interface IFormGroupProps {
  children: ReactNode;
  error?: string | null;
  isLoading?: boolean;
}

export function FormGroup({ children, error = null, isLoading = false }: IFormGroupProps) {
  return (
    <div className="form-group">
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>

      {error && <small>{error}</small>}
    </div>
  );
}
