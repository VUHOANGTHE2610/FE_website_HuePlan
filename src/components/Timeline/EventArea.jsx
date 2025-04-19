import React from 'react';
import EventBox from './EventBox';

// Component hiển thị khu vực các sự kiện theo giờ
const EventArea = ({ events, onSetTime }) => {
  // Tạo danh sách các mốc giờ từ 0:00 đến 23:00
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  // Hàm gửi thời gian lên TimelineView
  const setTime = (hourIndex) => {
    const startTime = hours[hourIndex];
    const endTime = hours[hourIndex + 1] || '23:59';
    onSetTime(startTime, endTime);
  };

  return (
    <div className="flex-1 relative">
      {hours.map((hour, index) => {
        // Tìm sự kiện bắt đầu tại giờ này
        const event = events.find((e) => e.start === hour);

        return (
          <div
            key={index}
            className="relative h-[80px] border-b border-gray-200 cursor-pointer 
                       hover:bg-purple-50 hover:ring-2 hover:ring-purple-300 transition-all duration-200"
            onClick={() => setTime(index)}
          >
            {/* Hiển thị EventBox nếu có sự kiện */}
            {event && (
              <EventBox
                event={event}
                onClick={() => setTime(index)} // Khi nhấn vào sự kiện, cũng cập nhật thời gian
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EventArea;