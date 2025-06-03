import api from "./api";

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

export const getAllUser = async() =>{
    try{
        const response = await api.get("api/users/getAll")
        if(response.data.success){
            return response.data.data;
        }
        else{
            throw new Error(response.data.message || "Lấy danh sách người dùng thất bại");
        }
    }
    catch (error){
        console.error("Lỗi khi gọi API getAllUser:", error.message);
        throw error;
    }
};

// TODO: Thêm các service sau vào backend
export const createUser = async (userData) => {
  try {
    const response = await api.post("/api/users/create", userData);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Không thể tạo người dùng mới");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi tạo người dùng mới");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/users/${userId}`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Không thể xóa người dùng");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi xóa người dùng");
  }
};