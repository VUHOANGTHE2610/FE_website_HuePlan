import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Common/Header';

const TimelineList = () => {
  const navigate = useNavigate();
  const [timelines, setTimelines] = useState([]);

  // Giả lập dữ liệu, sau này sẽ gọi API
  useEffect(() => {
    const mockTimelines = [
      { time_line_id: 1, time_line_name: 'Chuyến đi Huế 2025' },
      { time_line_id: 2, time_line_name: 'Hà Nội 3 ngày 2 đêm' },
    ];
    setTimelines(mockTimelines);
  }, []);

  const handleAddTimeline = () => {
    // Sau này sẽ gọi API POST /api/timelines
    const newTimeline = {
      time_line_id: timelines.length + 1,
      time_line_name: `Lịch trình mới ${timelines.length + 1}`,
    };
    setTimelines([...timelines, newTimeline]);
  };

  const handleDeleteTimeline = (time_line_id) => {
    // Sau này sẽ gọi API DELETE /api/timelines/{time_line_id}
    setTimelines(timelines.filter((timeline) => timeline.time_line_id !== time_line_id));
  };

  return (
    <div>
      <Header />
      <div className="p-4 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">Danh sách lịch trình</h1>
        <button
          onClick={handleAddTimeline}
          className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Thêm lịch trình mới
        </button>
        <div className="grid gap-4">
          {timelines.map((timeline) => (
            <div
              key={timeline.time_line_id}
              className="p-4 border rounded flex justify-between items-center hover:bg-purple-50"
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/timelines/${timeline.time_line_id}`)}
              >
                <h2 className="text-lg font-semibold">{timeline.time_line_name}</h2>
              </div>
              <button
                onClick={() => handleDeleteTimeline(timeline.time_line_id)}
                className="text-red-500 hover:text-red-700"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineList;