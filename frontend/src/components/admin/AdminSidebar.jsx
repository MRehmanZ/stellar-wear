import { Sidebar, SidebarItem, SidebarSection } from "@/components/ui/sidebar";
import { FaUser, FaBox, FaShoppingCart, FaChartLine, FaCog } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarSection title="Management">
        <SidebarItem icon={<FaBox />} label="Products" to="/admin/products" />
        <SidebarItem icon={<FaUser />} label="Users" to="/admin/users" />
        <SidebarItem icon={<FaShoppingCart />} label="Orders" to="/admin/orders" />
      </SidebarSection>
      <SidebarSection title="Analytics">
        <SidebarItem icon={<FaChartLine />} label="Dashboard" to="/admin/dashboard" />
      </SidebarSection>
      <SidebarSection title="Settings">
        <SidebarItem icon={<FaCog />} label="Settings" to="/admin/settings" />
      </SidebarSection>
    </Sidebar>
  );
};

export default AdminSidebar;
