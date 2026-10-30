import { Outlet } from "react-router";
import Sidebar from "../layout/Sidebar";


const DashboardLayout = ({ sidebar, children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
