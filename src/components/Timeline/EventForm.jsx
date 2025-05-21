import React, { useState, useEffect } from 'react';
import { addDayItem, addTimeLineDay } from '../../services/eventService';
import { useParams } from 'react-router-dom';

const EventForm = ({ initialData, setFormData, dayId, onSave }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { timelineId } = useParams();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError('Vui lòng nhập tiêu đề!');
      return;
    }
    if (!startTime || !endTime) {
      setError('Vui lòng chọn thời gian!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let currentDayId = dayId;

      if (!currentDayId) {
        const newDay = await addTimeLineDay({
          timeLine_ID: timelineId,
          day_date: new Date().toISOString().split('T')[0],
        });
        currentDayId = newDay.day_ID;
        if (!currentDayId) throw new Error('Không thể tạo ngày mới!');
      }

      const dayItemData = {
        day_ID: currentDayId,
        item_title: title,
        start_time: startTime + ':00',
        end_time: endTime + ':00',
        location: address || place || '',
        cost: 0,
        note: note || '',
      };

      const savedItem = await addDayItem(dayItemData);
      const newEvent = {
        item_ID: savedItem.item_ID,
        title: savedItem.item_title,
        start: savedItem.start_time ? savedItem.start_time.slice(0, 5) : '00:00',
        end: savedItem.end_time ? savedItem.end_time.slice(0, 5) : '00:00',
        place: savedItem.location,
        address: savedItem.location,
        note: savedItem.note,
        day_ID: currentDayId,
      };

      onSave(newEvent, currentDayId);
      alert('Thêm sự kiện thành công!');

      setTitle('');
      setStartTime('');
      setEndTime('');
      setPlace('');
      setAddress('');
      setNote('');
      setFormData({
        title: '',
        start: '',
        end: '',
        place: '',
        address: '',
        note: '',
      });
    } catch (err) {
      setError(err.message || 'Lưu sự kiện thất bại!');
      console.error('Lỗi khi lưu sự kiện:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-md font-bold text-purple-700 mb-2">📅 Thêm sự kiện</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Tiêu đề</label>
        <input
          className="w-full border rounded px-2 py-1 text-sm"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateFormData('title', e.target.value);
          }}
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
            onChange={(e) => {
              setStartTime(e.target.value);
              updateFormData('start', e.target.value);
            }}
            disabled={loading}
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
            disabled={loading}
          />
        </div>
      </div>
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Địa điểm</label>
        <input
          className="w-full border rounded px-2 py-1 text-sm"
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
            updateFormData('place', e.target.value);
          }}
          disabled={loading}
        />
      </div>
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Địa chỉ</label>
        <input
          className="w-full border rounded px-2 py-1 text-sm"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            updateFormData('address', e.target.value);
          }}
          disabled={loading}
        />
      </div>
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
          disabled={loading}
        />
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
          disabled={loading}
        >
          {loading ? 'Đang lưu...' : 'Lưu'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;