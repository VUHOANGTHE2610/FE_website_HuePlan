// src/components/Timeline/TimelineTabs.jsx
import React, { useState } from 'react';
import TimelineView from './TimelineView';
import EventForm from './EventForm';
import XacNhanXoaModal from './XacNhanXoaModal';

const TimelineTabs = () => {
  const [ngayDangChon, setNgayDangChon] = useState(0); // Ngày đang chọn
  const [suKienTheoNgay, setSuKienTheoNgay] = useState([
    [], // Ngày 1
    [], // Ngày 2
    [], // Ngày 3
  ]);

  const [hienForm, setHienForm] = useState(false);
  const [duLieuForm, setDuLieuForm] = useState(null); // dữ liệu truyền cho form
  // Modal xác nhận xoá ngày
  const [hienModalXoa, setHienModalXoa] = useState(false);
  const [chiSoCanXoa, setChiSoCanXoa] = useState(null);

  // APU sẻ tương tác ở đây
  const xuLyThemSuKien = (suKienMoi) => {
    const capNhat = [...suKienTheoNgay];
    capNhat[ngayDangChon].push(suKienMoi);
    setSuKienTheoNgay(capNhat);
  };

  return (
    <div className="w-full">
      {/* Tabs chuyển ngày + nút thêm ngày */}
      <div className="flex items-center border-b mb-4">
        {suKienTheoNgay.map((_, chiSo) => (
          <div key={chiSo} className="relative group flex items-center">
            <button
              onClick={() => setNgayDangChon(chiSo)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                ngayDangChon === chiSo
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-purple-500'
              }`}
            >
              Ngày {chiSo + 1}
            </button>

            {/* Nút xoá ngày */}
            {suKienTheoNgay.length > 1 && (
              <button
                onClick={() => {
                  setChiSoCanXoa(chiSo);
                  setHienModalXoa(true);
                }}
                className="text-red-400 text-xs px-1 hover:text-red-600 absolute -right-2 top-1/2 -translate-y-1/2 hidden group-hover:block"
                title="Xoá ngày này"
              >
                ❌
              </button>
            )}
          </div>
        ))}

        {/* Nút + thêm ngày */}
        <button
          onClick={() => {
            setSuKienTheoNgay([...suKienTheoNgay, []]);
            setNgayDangChon(suKienTheoNgay.length);
          }}
          className="ml-2 px-3 text-lg text-purple-600 hover:text-purple-800 transition"
          title="Thêm ngày mới"
        >
          +
        </button>
      </div>

      {/* Timeline view */}
      <TimelineView
        events={suKienTheoNgay[ngayDangChon]}
        onUpdateEvent={(dsMoi) => {
          const capNhat = [...suKienTheoNgay];
          capNhat[ngayDangChon] = dsMoi;
          setSuKienTheoNgay(capNhat);
        }}
        onMoForm={(duLieu) => {
          setDuLieuForm(duLieu);
          setHienForm(true);
        }}
      />

      {/* Form popup */}
      {hienForm && (
        <EventForm
          duLieuBanDau={duLieuForm}
          onClose={() => setHienForm(false)}
          onSave={(duLieuSuKien) => {
            xuLyThemSuKien(duLieuSuKien);
            setHienForm(false);
          }}
        />
      )}

      {/* Modal xác nhận xoá ngày */}
      {chiSoCanXoa !== null && (
        <XacNhanXoaModal
          hien={hienModalXoa}
          tenNgay={`Ngày ${chiSoCanXoa + 1}`}
          onDong={() => {
            setHienModalXoa(false);
            setChiSoCanXoa(null);
          }}
          onXoa={() => {
            const capNhat = [...suKienTheoNgay];
            capNhat.splice(chiSoCanXoa, 1);
            setSuKienTheoNgay(capNhat);
            setNgayDangChon((prev) =>
              prev === chiSoCanXoa
                ? Math.max(0, chiSoCanXoa - 1)
                : prev > chiSoCanXoa
                ? prev - 1
                : prev
            );
            setHienModalXoa(false);
            setChiSoCanXoa(null);
          }}
        />
      )}
    </div>
  );
};

export default TimelineTabs;
