import type { ReactNode } from 'react';
import './select.scss';

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  children?: ReactNode;
}

export function Select({ error = '', children, ...rest }: ISelectProps) {
  return (
    <select className={`custom-select ${error?.length && '-error'}`} {...rest}>
      {children}
    </select>
  );
}
