// /src/components/admin/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBox, FaClipboardList, FaHome } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar w-64 bg-gray-800 text-white">
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="flex flex-col p-4">
        <Link to="/admin" className="flex items-center p-2 mb-4 hover:bg-gray-700">
          <FaHome className="mr-2" /> Home
        </Link>
        <Link to="/admin/products" className="flex items-center p-2 mb-4 hover:bg-gray-700">
          <FaBox className="mr-2" /> Products
        </Link>
        <Link to="/admin/users" className="flex items-center p-2 mb-4 hover:bg-gray-700">
          <FaUsers className="mr-2" /> Users
        </Link>
        <Link to="/admin/orders" className="flex items-center p-2 mb-4 hover:bg-gray-700">
          <FaClipboardList className="mr-2" /> Orders
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
