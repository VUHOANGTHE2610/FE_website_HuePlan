

const XacNhanDangXuatModal = ({ hien, onXacNhan, onHuy }) => {
  if (!hien) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full border border-purple-300">
        <h2 className="text-lg font-semibold text-purple-700 mb-4">Xác nhận đăng xuất</h2>
        <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn đăng xuất không?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onHuy}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
          >
            Hủy
          </button>
          <button
            onClick={onXacNhan}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default XacNhanDangXuatModal;
