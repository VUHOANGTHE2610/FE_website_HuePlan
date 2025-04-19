import React from 'react';
import TimeColumn from './TimeColumn';           // Cột giờ hiển thị từ 0h đến 23h
import EventArea from './EventArea';            // Khu vực để hiển thị và thêm sự kiện
import EventForm from './EventForm';            // Form để thêm/sửa sự kiện
import DiaDiemDeXuat from './SuggestedPlaces';  // Gợi ý địa điểm phía dưới form

const TimelineView = ({ events, onUpdateEvent, duLieuForm, onMoForm, onLuuSuKien }) => {
  return (
    <div className="flex h-full border border-purple-300 rounded overflow-hidden">
      {/* Bên trái: cột thời gian và sự kiện */}
      <div className="w-2/4 flex border-r border-purple-300">
        <TimeColumn />
        <EventArea events={events} onUpdateEvent={onUpdateEvent} onMoForm={onMoForm} />
      </div>

      {/* Bên phải: Form thêm sự kiện và gợi ý địa điểm */}
      <div className="w-2/4 flex flex-col">
        {/* Form thêm sự kiện chiếm 2/5 chiều cao */}
        <div className="p-4 border-b border-purple-300 h-[30%]">
          <EventForm duLieuBanDau={duLieuForm} onLuu={onLuuSuKien} />
        </div>

        {/* Gợi ý địa điểm chiếm 3/5 chiều cao */}
        <div className="p-4 overflow-y-auto flex-1">
          <DiaDiemDeXuat />
        </div>
      </div>
    </div>
  );
};

export default TimelineView;