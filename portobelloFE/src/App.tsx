import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './pages/routes';
import { ToastContainer } from './components/toast/toastContainer/toastContainer';
import './assets/styles/global.scss';

export function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <AppRoutes />
    </BrowserRouter>
  );
}
