import React, { useState, useEffect } from 'react';

const EventForm = ({ duLieuBanDau, onLuu }) => {
  const [tieuDe, setTieuDe] = useState('');
  const [thoiGianBatDau, setThoiGianBatDau] = useState('');
  const [thoiGianKetThuc, setThoiGianKetThuc] = useState('');
  const [tenDiaDiem, setTenDiaDiem] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  useEffect(() => {
    if (duLieuBanDau) {
      setTieuDe(duLieuBanDau.title || '');
      setThoiGianBatDau(duLieuBanDau.start || '');
      setThoiGianKetThuc(duLieuBanDau.end || '');
      setTenDiaDiem(duLieuBanDau.place || '');
      setDiaChi(duLieuBanDau.address || '');
      setGhiChu(duLieuBanDau.note || '');
    }
  }, [duLieuBanDau]);

  const handleChonDiaDiem = () => {
    const diaDiem = { name: 'Đại Nội Huế', address: '23 Lê Huân, TP. Huế' };
    setTenDiaDiem(diaDiem.name);
    setDiaChi(diaDiem.address);
    if (!tieuDe) setTieuDe(diaDiem.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const suKienMoi = {
      title: tieuDe,
      start: thoiGianBatDau,
      end: thoiGianKetThuc,
      place: tenDiaDiem,
      address: diaChi,
      note: ghiChu,
    };
    onLuu(suKienMoi);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold text-purple-700 mb-2">📅 Thêm / Sửa sự kiện</h2>
      <div className="mb-2">
        <label className="block text-sm mb-1">Tiêu đề</label>
        <input className="w-full border rounded px-3 py-1" value={tieuDe} onChange={(e) => setTieuDe(e.target.value)} />
      </div>

      <div className="flex gap-2 mb-2">
        <div className="flex-1">
          <label className="block text-sm mb-1">Bắt đầu</label>
          <input type="time" className="w-full border rounded px-3 py-1" value={thoiGianBatDau} onChange={(e) => setThoiGianBatDau(e.target.value)} />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Kết thúc</label>
          <input type="time" className="w-full border rounded px-3 py-1" value={thoiGianKetThuc} onChange={(e) => setThoiGianKetThuc(e.target.value)} />
        </div>
      </div>
      
      <div className="mb-2">
        <label className="block text-sm mb-1">Địa điểm</label>
        <div className="flex gap-2">
          <input value={tenDiaDiem} className="flex-1 border rounded px-3 py-1" readOnly />
          <button type="button" onClick={handleChonDiaDiem} className="bg-blue-500 text-white px-2 rounded hover:bg-blue-600">Chọn</button>
        </div>
      </div>

      <div className="mb-2">
        <label className="block text-sm mb-1">Địa chỉ</label>
        <input value={diaChi} className="w-full border rounded px-3 py-1" readOnly />
      </div>

      <div className="mb-2">
        <label className="block text-sm mb-1">Ghi chú</label>
        <textarea className="w-full border rounded px-3 py-1" value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} rows={2} />
      </div>

      <div className="text-right">
        <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">Lưu</button>
      </div>
    </form>
  );
};

export default EventForm;