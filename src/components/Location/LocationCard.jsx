import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, MapPin, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const LocationCard = ({ location }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const photos = location.location_Photos || [];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleOpenModal = (idx) => {
    setCurrentPhotoIndex(idx);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Mô tả giới hạn 88 ký tự
  const desc = location.location_Description || "";
  const maxLength = 88;
  const isLongDesc = desc.length > maxLength;
  const shortDesc = desc.slice(0, maxLength) + (isLongDesc ? "..." : "");

  return ( 
  <div className="w-full max-w-5xl mx-auto my-8 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row relative">

      {/* Icon lưu */}
      <button className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-purple-100 transition">
        <Bookmark size={24} className="text-purple-600" />
      </button>

      {/* Ảnh địa điểm */}
      <div className="md:w-[40%] w-full flex-shrink-0">
        <div className="relative w-full h-64 md:h-80 overflow-hidden cursor-pointer group">
          {photos.length > 0 ? (
            <>
              <img
                src={API_URL + photos[currentPhotoIndex].photoUrl}
                alt={location.location_Name}
                className="w-full h-full object-cover group-hover:brightness-90 transition"
                onClick={() => handleOpenModal(currentPhotoIndex)}
              />
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                    {photos.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentPhotoIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Không có ảnh</span>
            </div>
          )}
        </div>
      </div>

      {/* Nội dung địa điểm */}
      <div className="md:w-[60%] w-full flex flex-col justify-between p-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {location.location_Name}
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {showFullDesc || !isLongDesc ? desc : shortDesc}
            {isLongDesc && (
              <button
                className="ml-2 text-blue-600 font-semibold hover:underline focus:outline-none"
                onClick={() => setShowFullDesc((v) => !v)}
              >
                {showFullDesc ? 'Ẩn bớt' : 'Xem thêm'}
              </button>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2 font-semibold text-blue-700">
            <MapPin size={18} />
            <span>{location.location_Address}</span>
          </div>
          <span className="font-semibold text-purple-600 text-right text-lg">
            {location.location_Cost.toLocaleString('vi-VN')} VNĐ / Người
          </span>
        </div>
      </div>

      {/* Modal xem ảnh */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-purple-100 transition z-50"
            onClick={handleCloseModal}
          >
            <X size={28} />
          </button>
          <button
            onClick={prevPhoto}
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition z-50"
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={API_URL + photos[currentPhotoIndex].photoUrl}
            alt={location.location_Name}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-lg"
          />
          <button
            onClick={nextPhoto}
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition z-50"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationCard;
