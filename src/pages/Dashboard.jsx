import { useNavigate } from "react-router";
import DashboardContent from "../components/dashboard/DashboardContent";
import { useEffect } from "react";

const Dashboard = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");

    useEffect(() => {
        if (token === null || usuario === null) {
            navigate("/login", { replace: true });
        }
    }, [token, usuario, navigate]);

    if (token === null || usuario === null) {
        return null;
    }

  return <DashboardContent />;
};

export default Dashboard;
