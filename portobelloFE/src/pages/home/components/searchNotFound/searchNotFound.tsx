import { SearchX } from 'lucide-react';
import './searchNotFound.scss';

export function SearchNotFound({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="search-not-found">
      <SearchX size={80} />

      <p>
        Nenhum resultado encontrado para <strong>"{searchTerm}"</strong>
      </p>
    </div>
  );
}
