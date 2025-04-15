import React, { useState, useEffect } from "react";

const EventFormModal = ({ isOpen, onClose, onSave, initialData, selectedSlot }) => {
  const [form, setForm] = useState({
    title: "",
    location: "",
    cost: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        location: initialData.location || "",
        cost: initialData.cost || "",
        start: initialData.startStr,
        end: initialData.endStr,
      });
    } else if (selectedSlot) {
      setForm({
        title: "",
        location: "",
        cost: "",
        start: selectedSlot.startStr,
        end: selectedSlot.endStr,
      });
    }
  }, [initialData, selectedSlot]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Thêm/Sửa Lịch Trình</h3>
        <input
          type="text"
          name="title"
          placeholder="Tên lịch trình"
          value={form.title}
          onChange={handleChange}
          className="mb-2 w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Địa điểm"
          value={form.location}
          onChange={handleChange}
          className="mb-2 w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="cost"
          placeholder="Giá cả"
          value={form.cost}
          onChange={handleChange}
          className="mb-2 w-full border px-3 py-2 rounded"
        />
        <input
          type="datetime-local"
          name="start"
          value={form.start}
          onChange={handleChange}
          className="mb-2 w-full border px-3 py-2 rounded"
        />
        <input
          type="datetime-local"
          name="end"
          value={form.end}
          onChange={handleChange}
          className="mb-4 w-full border px-3 py-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500 hover:text-black">Hủy</button>
          <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
