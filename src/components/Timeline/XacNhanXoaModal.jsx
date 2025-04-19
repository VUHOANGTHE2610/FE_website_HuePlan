// src/components/Timeline/XacNhanXoaModal.jsx
import React from "react";

const XacNhanXoaModal = ({ hien, onDong, onXoa, tenNgay }) => {
  if (!hien) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl border border-purple-300">
        <h2 className="text-lg font-semibold text-red-600 mb-2">Xác nhận xoá</h2>
        <p className="text-gray-700 mb-4">
          Bạn có chắc muốn xoá <strong>{tenNgay}</strong>? Tất cả các sự kiện sẽ bị mất.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={onDong}
          >
            Hủy
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={onXoa}
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default XacNhanXoaModal;
