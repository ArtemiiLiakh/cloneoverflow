import { Menu } from './components/menu';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles'

export const App = () => {
  return (
    <div className="App">
      <Menu/>
      <Outlet/>
    </div>
  );
}