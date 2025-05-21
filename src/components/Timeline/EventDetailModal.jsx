import React, { useState, useEffect } from 'react';
import { updateDayItem } from '../../services/eventService';

const EventDetailModal = ({ show, event, onClose, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (event) {
      console.log('EventDetailModal - event:', event); // Debug
      setTitle(event.title || '');
      setStartTime(event.start || '');
      setEndTime(event.end || '');
      setPlace(event.place || '');
      setAddress(event.address || '');
      setNote(event.note || '');
    }
  }, [event]);

  if (!show || !event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert('Vui lòng nhập tiêu đề!');
      return;
    }
    if (!startTime || !endTime) {
      alert('Vui lòng chọn thời gian!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedItem = {
        item_ID: event.item_ID,
        day_ID: event.day_ID,
        item_title: title,
        start_time: startTime + ':00',
        end_time: endTime + ':00',
        location: address || '',
        cost: 0,
        note: note || '',
      };

      const savedItem = await updateDayItem(updatedItem);
      onUpdate({
        item_ID: savedItem.item_ID,
        title: savedItem.item_title,
        start: savedItem.start_time ? savedItem.start_time.slice(0, 5) : startTime,
        end: savedItem.end_time ? savedItem.end_time.slice(0, 5) : endTime,
        place: savedItem.title,
        address: savedItem.location,
        note: savedItem.note,
        day_ID: savedItem.day_ID,
      });
      alert('Sự kiện đã được cập nhật thành công!');
      onClose();
    } catch (err) {
      setError(err.message || 'Cập nhật sự kiện thất bại!');
      alert(err.message || 'Cập nhật sự kiện thất bại!');
      console.error('Lỗi khi cập nhật sự kiện:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-purple-300">
        <h2 className="text-lg font-semibold text-purple-700 mb-2">Chỉnh sửa sự kiện: {title}</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">Tiêu đề</label>
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1">Bắt đầu</label>
              <input
                type="time"
                className="w-full border rounded px-2 py-1 text-sm"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1">Kết thúc</label>
              <input
                type="time"
                className="w-full border rounded px-2 py-1 text-sm"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">Địa điểm</label>
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">Địa chỉ</label>
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1">Ghi chú</label>
            <textarea
              className="w-full border rounded px-2 py-1 text-sm"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              disabled={loading}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
              disabled={loading}
            >
              Đóng
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              disabled={loading}
            >
              {loading ? 'Đang lưu...' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDetailModal;