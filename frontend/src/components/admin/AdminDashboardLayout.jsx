// src/components/admin/AdminDashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/ui/sidebar/Sidebar';
import SidebarItem from '@/components/ui/sidebar/SidebarItem';
import SidebarSection from '@/components/ui/sidebar/SidebarSection';

const AdminDashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarSection title="Management">
          <SidebarItem to="/admin/products">Products</SidebarItem>
          <SidebarItem to="/admin/users">Users</SidebarItem>
          <SidebarItem to="/admin/orders">Orders</SidebarItem>
        </SidebarSection>
        <SidebarSection title="Settings">
          <SidebarItem to="/admin/settings">Settings</SidebarItem>
        </SidebarSection>
      </Sidebar>
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
