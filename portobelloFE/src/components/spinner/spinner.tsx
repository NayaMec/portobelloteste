import './spinner.scss';

interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 32 }: SpinnerProps) {
  return <div className="spinner" style={{ ['--spinner-size' as any]: `${size}px` }} />;
}
