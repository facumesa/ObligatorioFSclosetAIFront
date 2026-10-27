import './styles.css';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Boton from './components/Boton';
import Contador from './components/Contador';

function App() {
  return (
    <Provider store={store}>
      <Contador/>
      <Boton/>
    <Dashboard/>
    </Provider>
  );
}

export default App;