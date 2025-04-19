// src/components/Timeline/EventArea.jsx
import React from 'react';
import EventBox from './EventBox'; // ✨ Thêm dòng import này

const EventArea = ({ events, onMoForm }) => {
  const danhSachGio = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const moFormVoiGio = (chiSoGio) => {
    const gioBatDau = danhSachGio[chiSoGio];
    const gioKetThuc = danhSachGio[chiSoGio + 1] || '23:59';

    onMoForm({
      title: '',
      start: gioBatDau,
      end: gioKetThuc,
      place: '',
      address: '',
      note: '',
    });
  };

  return (
    <div className="flex-1 relative">
      {danhSachGio.map((gio, chiSo) => {
        const suKien = events.find((sk) => sk.start === gio);

        return (
          <div
            key={chiSo}
            className="relative h-[80px] border-b border-gray-200 cursor-pointer 
                       hover:bg-purple-50 hover:ring-2 hover:ring-purple-300 transition-all duration-200"
            onClick={() => moFormVoiGio(chiSo)}
          >
            {suKien && (
              <EventBox suKien={suKien} onClick={() => onMoForm(suKien)} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EventArea;
