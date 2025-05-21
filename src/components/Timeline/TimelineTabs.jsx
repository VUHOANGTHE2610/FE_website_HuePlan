import React, { useState, useEffect } from 'react';
import TimelineView from './TimelineView';
import XacNhanXoaModal from './XacNhanXoaModal';
import { getTimeLineDaysByTimeLineId, deleteTimeLineDay, addTimeLineDay } from '../../services/eventService';

const TimelineTabs = ({ timelineId }) => {
  const [eventsByDay, setEventsByDay] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!timelineId) return;
    setIsLoading(true);
    setError(null);
    getTimeLineDaysByTimeLineId(timelineId)
      .then((days) => {
        console.log('Dữ liệu API:', days); // Debug: Kiểm tra dữ liệu API
        const mapped = Array.isArray(days)
          ? days.map(day => ({
              dayId: day.day_ID,
              events: day.dayItemList
                ? [...new Set(day.dayItemList
                    .filter(item => item.item_title && item.start_time && item.end_time) // Lọc sự kiện hợp lệ
                    .map(JSON.stringify))].map(JSON.parse) // Loại bỏ trùng lặp
                    .map(item => ({
                      item_ID: item.item_ID,
                      title: item.item_title,
                      start: item.start_time.slice(0, 5), // HH:mm
                      end: item.end_time.slice(0, 5),     // HH:mm
                      place: item.location,
                      address: item.location,
                      note: item.note,
                      color: item.color || 'bg-purple-500', // Thêm màu mặc định
                    }))
                : [],
            }))
          : [{ dayId: null, events: [] }];
        console.log('eventsByDay:', mapped); // Debug: Kiểm tra dữ liệu sau ánh xạ
        setEventsByDay(mapped);
        setSelectedDayIndex(0);
      })
      .catch((err) => {
        console.error('Lỗi khi tải dữ liệu lịch trình:', err);
        setError(err.message || 'Không thể tải dữ liệu lịch trình!');
        setEventsByDay([{ dayId: null, events: [] }]);
      })
      .finally(() => setIsLoading(false));
  }, [timelineId]);

  useEffect(() => {
    if (eventsByDay.length === 0) {
      setEventsByDay([{ dayId: null, events: [] }]);
    }
  }, [eventsByDay]);

  const handleDeleteDay = async (index) => {
    console.log('Xóa ngày tại index:', index);
    setIsLoading(true);
    setError(null);
    try {
      const dayToDelete = eventsByDay[index];
      if (dayToDelete.dayId) {
        await deleteTimeLineDay(dayToDelete.dayId);
      }
      const updatedEvents = [...eventsByDay];
      updatedEvents.splice(index, 1);
      setEventsByDay(updatedEvents);
      setSelectedDayIndex((prev) =>
        prev === index ? Math.max(0, index - 1) : prev > index ? prev - 1 : prev
      );
      alert('Ngày đã bị xóa!');
    } catch (err) {
      setError('Không thể xóa ngày.');
      console.error('Lỗi khi xóa ngày:', err);
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
      setDeleteIndex(null);
    }
  };

  const handleUpdateDayId = (newDayId) => {
    const updatedEvents = [...eventsByDay];
    updatedEvents[selectedDayIndex].dayId = newDayId;
    setEventsByDay(updatedEvents);
  };

  const currentDay = eventsByDay[selectedDayIndex] || { dayId: null, events: [] };

  return (
    <div className="w-full">
      <div className="flex items-center border-b mb-4 overflow-x-auto">
        {eventsByDay.map((_, index) => (
          <div key={index} className="relative group flex items-center min-w-[120px]">
            <button
              onClick={() => setSelectedDayIndex(index)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                selectedDayIndex === index
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-purple-500'
              }`}
            >
              Ngày {index + 1}
            </button>
            {eventsByDay.length > 1 && (
              <button
                onClick={() => {
                  setDeleteIndex(index);
                  setShowDeleteModal(true);
                }}
                className="text-red-400 text-sm px-2 py-1 hover:text-red-600 absolute -right-4 top-1/2 -translate-y-1/2 hidden group-hover:block"
                title="Xóa ngày này"
              >
                ❌
              </button>
            )}
          </div>
        ))}
        <button
          onClick={async () => {
            setIsLoading(true);
            try {
              const newDay = await addTimeLineDay({
                timeLine_ID: timelineId,
                day_date: new Date().toISOString().split('T')[0],
              });
              setEventsByDay([...eventsByDay, { dayId: newDay.day_ID, events: [] }]);
              setSelectedDayIndex(eventsByDay.length);
            } catch (err) {
              console.error('Lỗi khi thêm ngày mới:', err);
              setError('Không thể thêm ngày mới!');
            } finally {
              setIsLoading(false);
            }
          }}
          className="ml-2 px-3 text-lg text-purple-600 hover:text-purple-800 transition"
          title="Thêm ngày mới"
        >
          +
        </button>
      </div>

      {isLoading && <div className="text-center p-4">Đang xử lý...</div>}
      {error && <div className="text-red-600 p-4">{error}</div>}

      <TimelineView
        dayId={currentDay.dayId}
        events={currentDay.events}
        setEvents={(newEvents) => {
          const updatedEvents = [...eventsByDay];
          updatedEvents[selectedDayIndex] = { ...updatedEvents[selectedDayIndex], events: newEvents };
          setEventsByDay(updatedEvents);
        }}
        onUpdateDayId={handleUpdateDayId}
      />

      {deleteIndex !== null && (
        <XacNhanXoaModal
          show={showDeleteModal}
          dayName={`Ngày ${deleteIndex + 1}`}
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteIndex(null);
          }}
          onDelete={() => handleDeleteDay(deleteIndex)}
        />
      )}
    </div>
  );
};

export default TimelineTabs;