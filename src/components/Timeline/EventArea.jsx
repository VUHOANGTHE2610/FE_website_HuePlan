import EventBox from './EventBox';

const EventArea = ({ events, onSetTime, onEventDelete, onEventClick }) => {
  const timeSlots = Array.from({ length: 24 * 6 }, (_, i) => {
    const hour = Math.floor(i / 6);
    const minute = (i % 6) * 10;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const setTime = (index) => {
    const startTime = timeSlots[index];
    const endTime = timeSlots[index + 6] || '23:59';
    onSetTime(startTime, endTime);
  };

  return (
    <div className="flex-1 relative">
      {timeSlots.map((time, index) => (
        <div
          key={index}
          className="relative h-[20px] border-b border-gray-200 cursor-pointer 
                     hover:bg-purple-50 hover:ring-2 hover:ring-purple-300 transition-all"
          onClick={() => setTime(index)}
        >
          {(events || []).filter((e) => e.start === time).map((event, eventIndex) => (
            <EventBox
              key={event.item_ID}
              suKien={event}
              onClick={() => onEventClick(event)}
              onDelete={onEventDelete}
              index={eventIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventArea;