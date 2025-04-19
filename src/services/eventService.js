/**
 * Service để gọi API liên quan đến sự kiện
 * Các hàm này sẽ được dùng trong TimelineTabs để tương tác với backend
 */

// Lấy danh sách sự kiện
export const getEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Lỗi khi tải sự kiện');
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Thêm sự kiện mới
  export const addEvent = async (dayIndex, event) => {
    try {
      const response = await fetch(`/api/events/${dayIndex}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error('Lỗi khi thêm sự kiện');
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Xóa một ngày
  export const deleteDay = async (dayIndex) => {
    try {
      const response = await fetch(`/api/events/${dayIndex}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Lỗi khi xóa ngày');
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };