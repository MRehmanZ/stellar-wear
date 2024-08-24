// src/components/ui/sidebar/SidebarSection.jsx
import React from 'react';

const SidebarSection = ({ title, children }) => {
  return (
    <div className="mb-4">
      {title && <h3 className="px-4 py-2 text-gray-400 uppercase text-sm">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

export default SidebarSection;
