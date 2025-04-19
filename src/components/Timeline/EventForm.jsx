import React, { useState, useEffect } from 'react';

// Component form để thêm sự kiện
const EventForm = ({ initialData, onSave, setFormData }) => {
  // Trạng thái cho các trường của form
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  // Cập nhật form khi initialData thay đổi
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setStartTime(initialData.start || '');
      setEndTime(initialData.end || '');
      setPlace(initialData.place || '');
      setAddress(initialData.address || '');
      setNote(initialData.note || '');
    }
  }, [initialData]);

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation cơ bản
    if (!title) {
      alert('Vui lòng nhập tiêu đề!');
      return;
    }
    if (!startTime || !endTime) {
      alert('Vui lòng chọn thời gian!');
      return;
    }
    // Tạo object sự kiện mới
    const newEvent = {
      title,
      start: startTime,
      end: endTime,
      place,
      address,
      note,
    };
    onSave(newEvent);
  };

  // Hàm cập nhật formData khi người dùng nhập
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-md font-bold text-purple-700 mb-2">📅 Thêm sự kiện</h2>
      {/* Trường tiêu đề */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Tiêu đề</label>
        <input
          className="w-full border rounded px-2 py-1 text-sm"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateFormData('title', e.target.value);
          }}
        />
      </div>

      {/* Trường thời gian */}
      <div className="flex gap-2 mb-2">
        <div className="flex-1">
          <label className="block text-xs font-medium mb-1">Bắt đầu</label>
          <input
            type="time"
            className="w-full border rounded px-2 py-1 text-sm"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              updateFormData('start', e.target.value);
            }}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium mb-1">Kết thúc</label>
          <input
            type="time"
            className="w-full border rounded px-2 py-1 text-sm"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
              updateFormData('end', e.target.value);
            }}
          />
        </div>
      </div>

      {/* Trường địa điểm */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Địa điểm</label>
        <input
          className="w-full border rounded px-2 py-1 text-sm"
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
            updateFormData('place', e.target.value);
          }}
        />
      </div>

      {/* Trường địa chỉ */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Địa chỉ</label>
        <input
          className="w-full border rounded px-2 py-1 text-sm"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            updateFormData('address', e.target.value);
          }}
        />
      </div>

      {/* Trường ghi chú */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Ghi chú</label>
        <textarea
          className="w-full border rounded px-2 py-1 text-sm"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            updateFormData('note', e.target.value);
          }}
          rows={2}
        />
      </div>

      {/* Nút lưu */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

export default EventForm;