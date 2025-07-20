import './input.scss';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error = '', ...rest }: IInputProps) {
  return <input className={`custom-input ${error?.length && '-error'}`} {...rest} />;
}
