const DashboardLayout = ({ sidebar, children }) => {
    return (
        <div className="layout">
            <aside className="sidebar">
                {sidebar}
            </aside>
            {children}
        </div>
    );
};

export default DashboardLayout;