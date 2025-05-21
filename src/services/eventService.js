import api from "./api";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Đăng ký thất bại";
    const errorDetails = error.response?.data?.data
      ? Object.entries(error.response.data.data)
          .map(([field, message]) => `${field}: ${message}`)
          .join("; ")
      : null;
    throw new Error(errorDetails || errorMessage);
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/api/auth/login", loginData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Đăng nhập thất bại";
    const errorDetails = error.response?.data?.data
      ? Object.entries(error.response.data.data)
          .map(([field, message]) => `${field}: ${message}`)
          .join("; ")
      : null;
    throw new Error(errorDetails || errorMessage);
  }
};

export const getUser = async (userId) => {
  try {
    const response = await api.get(`/api/users/${userId}`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Không thể lấy thông tin người dùng");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi lấy thông tin người dùng");
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await api.put("/api/users/update", userData);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Không thể cập nhật thông tin");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi cập nhật thông tin");
  }
};

export const getTimelinesByUserId = async (userId) => {
  const response = await api.get(`/api/client/timeLine/user/${userId}`);
  if (response.data.success) return response.data.data;
  throw new Error(response.data.message || "Không thể lấy danh sách người dùng");
};

export const addTimeline = async (timelineData) => {
  const response = await api.post("/api/client/timeLine", timelineData);
  if (response.data.success) return response.data.data;
  throw new Error(response.data.message || "Thêm timeline thất bại");
};

export const updateTimeline = async (id, timelineData) => {
  const response = await api.put(`/api/client/timeLine/${id}`, timelineData);
  if (response.data.success) return response.data.data;
  throw new Error(response.data.message || "Cập nhật timeline thất bại");
};

export const deleteTimeline = async (id) => {
  const response = await api.delete(`/api/client/timeLine/${id}`);
  if (response.data.success) return true;
  throw new Error(response.data.message || "Xóa timeline thất bại");
};

export const getTimeLineDaysByTimeLineId = async (timeLineId) => {
  try {
    const response = await api.get(`/api/client/timeLineDay/timeline/${timeLineId}`);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Không thể lấy danh sách TimeLineDay");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi lấy danh sách TimeLineDay");
  }
};

export const addTimeLineDay = async (timeLineDayData) => {
  try {
    const response = await api.post("/api/client/timeLineDay", timeLineDayData);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Thêm TimeLineDay thất bại");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi thêm TimeLineDay");
  }
};

export const deleteTimeLineDay = async (timeLineDayId) => {
  try {
    const response = await api.delete(`/api/client/timeLineDay/${timeLineDayId}`);
    if (response.data.success) return true;
    throw new Error(response.data.message || "Xóa TimeLineDay thất bại");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi xóa TimeLineDay");
  }
};

export const getDayItemsByDayId = async (dayId) => {
  try {
    const response = await api.get(`/api/client/dayItem/day/${dayId}`);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Không thể lấy danh sách DayItem");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi lấy danh sách DayItem");
  }
};

export const addDayItem = async (dayItemData) => {
  try {
    const response = await api.post("/api/client/dayItem", dayItemData);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Thêm DayItem thất bại");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi thêm DayItem");
  }
};

export const updateDayItem = async (dayItemData) => {
  try {
    const response = await api.put(`/api/client/dayItem/${dayItemData.item_ID}`, dayItemData);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Cập nhật DayItem thất bại");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi cập nhật DayItem");
  }
};

export const deleteDayItem = async (dayItemId) => {
  try {
    const response = await api.delete(`/api/client/dayItem/${dayItemId}`);
    if (response.data.success) return true;
    throw new Error(response.data.message || "Xóa DayItem thất bại");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi xóa DayItem");
  }
};