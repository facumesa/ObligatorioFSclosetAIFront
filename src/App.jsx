import './styles.css';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Dashboard/>
  );
}

export default App;