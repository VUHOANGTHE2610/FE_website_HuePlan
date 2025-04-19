// src/components/Timeline/EventBox.jsx
import React from 'react';

const EventBox = ({ suKien, onClick }) => {
  if (!suKien) return null;

  return (
    <div
      className={`absolute left-2 top-1/4 px-2 py-1 rounded text-white text-sm shadow-md cursor-pointer 
                  transition-all duration-200 ease-in-out border-l-4 border-white
                  ${suKien.color || 'bg-purple-500'} hover:scale-105 hover:ring-2 hover:ring-purple-300`}
      onClick={onClick}
    >
      <div className="font-semibold">{suKien.title}</div>
      <div className="text-xs">
        {suKien.start} - {suKien.end}
      </div>
    </div>
  );
};

export default EventBox;
