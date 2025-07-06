import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 w-full p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
