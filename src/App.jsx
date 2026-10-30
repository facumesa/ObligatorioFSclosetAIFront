import "./styles.css";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Boton from "./components/Boton";
import Contador from "./components/Contador";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Register />}></Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/contador"
              element={
                <>
                  {" "}
                  <Contador />
                  <Boton />
                </>
              }
            />
            {/* <Route path="/outfits" element={<Outfits />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
