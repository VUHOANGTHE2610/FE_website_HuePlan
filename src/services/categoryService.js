import api from "./api";

export const getAllCategories = async () => {
  try {
    const response = await api.get("/api/category/GetAll");
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Không thể lấy danh sách loại địa điểm");
  } catch (error) {
    console.error("Lỗi khi gọi API getAllCategories:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi lấy danh sách loại địa điểm");
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/api/category/${id}`);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Không thể lấy thông tin loại địa điểm");
  } catch (error) {
    console.error("Lỗi khi gọi API getCategoryById:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi lấy thông tin loại địa điểm");
  }
};

export const addCategory = async (category) => {
  try {
    const response = await api.post("/api/category", category);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Không thể thêm loại địa điểm");
  } catch (error) {
    console.error("Lỗi khi gọi API addCategory:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi thêm loại địa điểm");
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await api.put(`/api/category/${id}`, category);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Không thể cập nhật loại địa điểm");
  } catch (error) {
    console.error("Lỗi khi gọi API updateCategory:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi cập nhật loại địa điểm");
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/api/category/${id}`);
    if (response.data.success) return response.data.data;
    throw new Error(response.data.message || "Không thể xóa loại địa điểm");
  } catch (error) {
    console.error("Lỗi khi gọi API deleteCategory:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : "Không có response từ server",
    });
    throw new Error(error.response?.data?.message || "Lỗi khi xóa loại địa điểm");
  }
}; 