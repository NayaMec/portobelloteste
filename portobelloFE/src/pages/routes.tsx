import { Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { DetailedOrder } from './detailedOrder/detailedOrder';
import { CreateOrder } from './createOrder/createOrder';
import { Header } from '../components/header/header';
import { EditOrder } from './editOrder/editOrder';

export function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order/:id" element={<DetailedOrder />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="/edit/:id" element={<EditOrder />} />
      </Routes>
    </>
  );
}
