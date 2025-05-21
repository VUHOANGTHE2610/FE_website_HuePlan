import React, { useState } from 'react';
import TimeColumn from './TimeColumn';
import EventArea from './EventArea';
import SuggestedPlaces from './SuggestedPlaces';
import EventForm from './EventForm';
import EventDetailModal from './EventDetailModal';
import { getDayItemsByDayId } from '../../services/eventService';

const TimelineView = ({ events, setEvents, dayId, onUpdateDayId }) => {
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    place: '',
    address: '',
    note: '',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleSetTime = (start, end) => {
    setFormData((prev) => ({
      ...prev,
      start,
      end,
    }));
  };

  const handleSetPlace = (place, address) => {
    setFormData((prev) => ({
      ...prev,
      place,
      address,
      title: prev.title || place,
    }));
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.item_ID !== eventId));
  };

  const handleSaveEvent = async (newEvent, updatedDayId) => {
    try {
      if (updatedDayId && updatedDayId !== dayId) {
        onUpdateDayId(updatedDayId);
      }
      const updatedEvents = await getDayItemsByDayId(updatedDayId || dayId);
      const mappedEvents = Array.isArray(updatedEvents)
        ? updatedEvents.map((item) => ({
            item_ID: item.item_ID,
            title: item.item_title,
            start: item.start_time ? item.start_time.slice(0, 5) : '00:00',
            end: item.end_time ? item.end_time.slice(0, 5) : '00:00',
            place: item.location,
            address: item.location,
            note: item.note,
            day_ID: item.day_ID,
          }))
        : [];
      setEvents(mappedEvents);
    } catch (err) {
      console.error('Lỗi khi làm mới sự kiện:', err);
      setEvents([...events, newEvent]);
    }

    setFormData({
      title: '',
      start: '',
      end: '',
      place: '',
      address: '',
      note: '',
    });
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map((event) =>
      event.item_ID === updatedEvent.item_ID ? updatedEvent : event
    ));
  };

  const handleOpenDetailModal = (event) => {
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-full border border-purple-300 rounded overflow-hidden">
      <div className="w-full md:w-2/4 flex flex-col md:flex-row border-b md:border-r border-purple-300">
        <TimeColumn />
        <EventArea
          events={events}
          onSetTime={handleSetTime}
          onEventDelete={handleDeleteEvent}
          onEventClick={handleOpenDetailModal}
        />
      </div>
      <div className="w-full md:w-2/4 flex flex-col">
        <div className="p-4 border-b border-purple-300 h-auto md:h-[22%]">
          <EventForm
            initialData={formData}
            onSave={handleSaveEvent}
            setFormData={setFormData}
            dayId={dayId}
          />
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          <SuggestedPlaces onSelectPlace={handleSetPlace} />
        </div>
      </div>
      <EventDetailModal
        show={showDetailModal}
        event={selectedEvent}
        onClose={() => setShowDetailModal(false)}
        onUpdate={handleUpdateEvent}
      />
    </div>
  );
};

export default TimelineView;