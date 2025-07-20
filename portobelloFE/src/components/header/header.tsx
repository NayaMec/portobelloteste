import logo from '../../assets/images/portobello-logo.png';
import './header.scss';

export function Header() {
  return (
    <header className="global-header">
      <img src={logo} alt="Logo da empresa Portobello" />

      <h1 className="title">Sistema para controle de pedidos</h1>
    </header>
  );
}
