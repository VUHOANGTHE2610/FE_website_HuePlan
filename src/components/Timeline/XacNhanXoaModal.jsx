import React from "react";

// Component modal xác nhận xóa ngày
const XacNhanXoaModal = ({ show, onClose, onDelete, dayName }) => {
  console.log('XacNhanXoaModal - show:', show); // Debug: kiểm tra giá trị show

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl border border-purple-300">
        <h2 className="text-lg font-semibold text-red-600 mb-2">Xác nhận xóa</h2>
        <p className="text-gray-700 mb-4">
          Bạn có chắc muốn xóa <strong>{dayName}</strong>? Tất cả các sự kiện sẽ bị mất.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={() => {
              console.log('Nhấn nút Hủy trong modal'); // Debug: kiểm tra khi nhấn Hủy
              onClose();
            }}
          >
            Hủy
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => {
              console.log('Nhấn nút Xóa trong modal'); // Debug: kiểm tra khi nhấn Xóa
              onDelete();
            }}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default XacNhanXoaModal;