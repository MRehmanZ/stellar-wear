// src/components/ui/sidebar/Sidebar.jsx
import React from 'react';

const Sidebar = ({ children }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      </div>
      <nav className="mt-4">
        {children}
      </nav>
    </aside>
  );
};

export default Sidebar;
