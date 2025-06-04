import React from 'react';
import SidebarAdmin from './SidebarAdmin';

const AdminHome = ({ content }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex-1 overflow-auto">
        {content}
      </div>
    </div>
  );
};

export default AdminHome;