import { PackageOpen } from 'lucide-react';
import './emptyList.scss';

export function EmptyList() {
  return (
    <div className="empty-list">
      <PackageOpen size={120} />

      <p>
        Você ainda não tem nenhum pedido cadastrado!
        <br />
        Clique no botão <strong>"Novo pedido"</strong> à cima para cadastrar o seu primeiro!
      </p>
    </div>
  );
}
