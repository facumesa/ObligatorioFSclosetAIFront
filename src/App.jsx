import "./styles.css";
import "./i18n/i18n.js";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./components/pages/Dashboard.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import CrearOutfit from "./components/CrearOutfit.jsx";
import MisOutfits from "./components/MisOutfits.jsx";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Register />}></Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crear-outfit" element={<CrearOutfit />} />
            <Route path="/misoutfits" element={<MisOutfits />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
