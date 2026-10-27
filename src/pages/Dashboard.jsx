import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import Hero from "../components/dashboard/Hero";
import DashboardContent from "../components/dashboard/DashboardContent";


const Dashboard = () => {
    return (
        <DashboardLayout sidebar={<Sidebar />}>
            <DashboardContent/>
        </DashboardLayout>
    );
};

export default Dashboard;