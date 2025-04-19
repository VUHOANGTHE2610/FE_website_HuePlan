import React, { useState } from 'react';
import TimeColumn from './TimeColumn';
import EventArea from './EventArea';
import SuggestedPlaces from './SuggestedPlaces';
import EventForm from './EventForm';

// Component hiển thị timeline của một ngày
const TimelineView = ({ events, setEvents }) => {
  // Trạng thái lưu dữ liệu form
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    place: '',
    address: '',
    note: '',
  });

  // Hàm cập nhật thời gian vào form
  const handleSetTime = (start, end) => {
    setFormData((prev) => ({
      ...prev,
      start,
      end,
    }));
  };

  // Hàm cập nhật địa điểm vào form
  const handleSetPlace = (place, address) => {
    setFormData((prev) => ({
      ...prev,
      place,
      address,
      title: prev.title || place, // Nếu chưa có tiêu đề, dùng tên địa điểm
    }));
  };

  // Hàm lưu sự kiện
  const handleSaveEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    // Reset form sau khi lưu
    setFormData({
      title: '',
      start: '',
      end: '',
      place: '',
      address: '',
      note: '',
    });
    alert('Sự kiện đã được lưu!');
  };

  return (
    <div className="flex flex-col md:flex-row h-full border border-purple-300 rounded overflow-hidden">
      {/* Cột bên trái: cột giờ và khu vực sự kiện */}
      <div className="w-full md:w-2/4 flex flex-col md:flex-row border-b md:border-r border-purple-300">
        <TimeColumn />
        <EventArea events={events} onSetTime={handleSetTime} />
      </div>

      {/* Cột bên phải: form và gợi ý địa điểm */}
      <div className="w-full md:w-2/4 flex flex-col">
        {/* Form thêm sự kiện */}
        <div className="p-4 border-b border-purple-300 h-auto md:h-[22%]">
          <EventForm
            initialData={formData}
            onSave={handleSaveEvent}
            setFormData={setFormData} // Truyền hàm để EventForm có thể cập nhật formData
          />
        </div>
        {/* Gợi ý địa điểm - chỉ render một lần */}
        <div className="p-4 overflow-y-auto flex-1">
          <SuggestedPlaces onSelectPlace={handleSetPlace} />
        </div>
      </div>
    </div>
  );
};

export default TimelineView;