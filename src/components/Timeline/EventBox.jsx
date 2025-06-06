import React, { useState } from 'react';
import { deleteDayItem } from '../../services/eventService';
import DirectionMap from '../DirectionMap';

const EventBox = ({ suKien, onClick, onDelete, index }) => {
  const [showMap, setShowMap] = useState(false);

  if (!suKien) return null;

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc muốn xóa sự kiện này?')) {
      try {
        await deleteDayItem(suKien.item_ID);
        onDelete(suKien.item_ID);
        alert('Xóa sự kiện thành công!');
      } catch (err) {
        console.error('Lỗi khi xóa sự kiện:', err);
        alert('Xóa sự kiện thất bại!');
      }
    }
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(suKien.start);
  const endMinutes = timeToMinutes(suKien.end);
  const durationMinutes = endMinutes - startMinutes;
  const slotHeight = 20;
  const height = (durationMinutes / 10) * slotHeight;

  // Kiểm tra xem có địa chỉ hoặc địa điểm không
  const hasLocation = suKien.address || suKien.place;

  return (
    <>
      <div
        className={`absolute left-2 px-2 py-0.5 rounded text-white text-xs shadow-md cursor-pointer 
                   transition-all border-l-4 border-white
                   ${suKien.color || 'bg-purple-500'} hover:scale-105 hover:ring-2 hover:ring-purple-300`}
        style={{
          height: `${height}px`,
          top: `${index * 20}px`,
          zIndex: index + 1,
          width: 'calc(100% - 16px)',
        }}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{suKien.title}</div>
            <div className="text-xs">{suKien.start} - {suKien.end}</div>
            {suKien.place && (
              <div className="text-xs text-gray-100 truncate flex items-center gap-1">
                <span>📍 {suKien.place}</span>
              </div>
            )}
            {suKien.cost && (
              <div className="text-xs text-green-100">
                💸 {Number(suKien.cost).toLocaleString('vi-VN')} VNĐ
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-red-200 hover:text-red-400"
            >
              🗑️
            </button>
            {hasLocation && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMap(true);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-0.5 rounded text-xs"
              >
                Chỉ đường
              </button>
            )}
          </div>
        </div>
      </div>
      {showMap && hasLocation && (
        <DirectionMap
          destination={{ address: suKien.address || suKien.place }}
          onClose={() => setShowMap(false)}
        />
      )}
    </>
  );
};

export default EventBox;