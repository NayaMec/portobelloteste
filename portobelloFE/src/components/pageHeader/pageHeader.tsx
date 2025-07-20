import { Link } from 'react-router-dom';
import { ArrowLeftCircle } from 'lucide-react';
import './pageHeader.scss';

interface IPageHeaderProps {
  title: string;
}

export function PageHeader({ title }: IPageHeaderProps) {
  return (
    <div className="page-header">
      <Link to="/">
        <ArrowLeftCircle size={32} />
      </Link>

      <h1>{title}</h1>
    </div>
  );
}
