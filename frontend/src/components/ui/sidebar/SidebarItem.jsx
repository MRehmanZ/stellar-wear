// src/components/ui/sidebar/SidebarItem.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block py-2.5 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
      }
    >
      {children}
    </NavLink>
  );
};

export default SidebarItem;
