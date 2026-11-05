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
import CrearOutfit from "../src/components/outfits/CrearOutfit.jsx";
import MisOutfits from "../src/components/outfits/MisOutfits.jsx";
import RutaProtegida from "./components/auth/RutaProtegida.jsx";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Register />}></Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
            <Route path="/crear-outfit" element={<RutaProtegida><CrearOutfit /></RutaProtegida>} />
            <Route path="/misoutfits" element={<RutaProtegida><MisOutfits /></RutaProtegida>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position='bottom-right'/>
    </Provider>
  );
}

export default App;
