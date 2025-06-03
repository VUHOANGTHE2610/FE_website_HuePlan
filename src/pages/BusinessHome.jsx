import React from 'react';
import SidebarBusiness from '../components/Business/SidebarBusiness';

const BusinessHome = ({ content }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarBusiness />
      <div className="flex-1 overflow-auto">
        {content}
      </div>
    </div>
  );
};

export default BusinessHome;