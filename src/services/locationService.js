import api from "./api";

export const getAllLocations = async () => {
  try {
    const response = await api.get("/api/location/getAll");
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Không thể lấy danh sách địa điểm");
  } catch (error) {
    console.error("Lỗi khi gọi API getAllLocations:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
      request: error.request ? "Có request nhưng không nhận được response" : "Không thể gửi request",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi lấy danh sách địa điểm");
  }
};
export const getLocationById = async (id) => {
  try {
    const response = await api.get(`/api/location/${id}`);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Không thể lấy thông tin địa điểm");
  } catch (error) {
    console.error("Lỗi khi gọi API getLocationById:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi lấy thông tin địa điểm");
  }
};

export const addLocation = async (formData) => {
  try {
    const response = await api.post("/api/location", formData);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Thêm địa điểm thất bại");
  } catch (error) {
    console.error("Lỗi khi gọi API addLocation:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw error; // Ném lỗi gốc để xử lý chi tiết hơn
  }
};

export const updateLocation = async (id, locationData) => {
  try {
    const response = await api.put(`/api/location/${id}`, locationData);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Cập nhật địa điểm thất bại");
  } catch (error) {
    console.error("Lỗi khi gọi API updateLocation:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi cập nhật địa điểm");
  }
};

export const deleteLocation = async (id) => {
  try {
    const response = await api.delete(`/api/location/${id}`);
    if (response.data.success) return true;
    throw new Error(response.data.message || "Xóa địa điểm thất bại");
  } catch (error) {
    console.error("Lỗi khi gọi API deleteLocation:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi xóa địa điểm");
  }
};

export const uploadPhoto = async (locationId, formData) => {
  try {
    const response = await api.post(`/api/location/${locationId}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Tải ảnh thất bại");
  } catch (error) {
    console.error("Lỗi khi gọi API uploadPhoto:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi tải ảnh");
  }
};

export const deletePhoto = async (photoId) => {
  try {
    const response = await api.delete(`/api/location/photos/${photoId}`);
    if (response.data.success) return true;
    throw new Error(response.data.message || "Xóa ảnh thất bại");
  } catch (error) {
    console.error("Lỗi khi gọi API deletePhoto:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi xóa ảnh");
  }
};