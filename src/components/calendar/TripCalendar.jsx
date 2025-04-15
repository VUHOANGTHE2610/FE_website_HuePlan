import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import EventFormModal from "./EventFormModal";
import useCalendarEvents from "./useCalendarEvents";

const TripCalendar = () => {
  const {
    events,
    isModalOpen,
    selectedEvent,
    selectedSlot,
    handleDateClick,
    handleEventClick,
    handleEventSave,
    handleCloseModal
  } = useCalendarEvents();

  return (
    <div className="p-4 max-w-7xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
        Lịch trình du lịch của bạn
      </h2>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={viLocale}
        selectable={true}
        editable={true}
        events={events}
        select={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />
      <EventFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleEventSave}
        initialData={selectedEvent}
        selectedSlot={selectedSlot}
      />
    </div>
  );
};

export default TripCalendar;
