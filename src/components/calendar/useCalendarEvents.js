import { useState } from "react";

const useCalendarEvents = () => {
  const [events, setEvents] = useState([
    {
      title: "Tham quan Đại Nội",
      start: "2025-04-14T09:00:00",
      end: "2025-04-14T11:00:00",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleDateClick = (info) => {
    setSelectedSlot(info);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = ({ event }) => {
    setSelectedEvent({
      title: event.title,
      startStr: event.startStr,
      endStr: event.endStr,
      location: event.extendedProps?.location || "",
      cost: event.extendedProps?.cost || "",
    });
    setIsModalOpen(true);
  };

  const handleEventSave = (form) => {
    // Nếu đang sửa
    if (selectedEvent) {
      setEvents((prev) =>
        prev.map((e) =>
          e.title === selectedEvent.title &&
          e.start === selectedEvent.startStr
            ? { ...form }
            : e
        )
      );
    } else {
      // Thêm mới
      setEvents((prev) => [...prev, form]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedSlot(null);
  };

  return {
    events,
    isModalOpen,
    selectedEvent,
    selectedSlot,
    handleDateClick,
    handleEventClick,
    handleEventSave,
    handleCloseModal,
  };
};

export default useCalendarEvents;
