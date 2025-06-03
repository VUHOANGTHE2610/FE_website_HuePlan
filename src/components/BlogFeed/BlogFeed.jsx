import React, { useState, useEffect } from 'react';
import Header from '../Common/Header';
import LocationCard from '../Location/LocationCard';
import { getAllLocations } from '../../services/locationService';

export default function BlogFeed() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        console.log('API location response:', data);
        setLocations(data);
      } catch (err) {
        setError('Không thể lấy danh sách địa điểm');
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Lọc địa điểm theo tên
  const filteredLocations = locations.filter((location) =>
    location.location_Name.toLowerCase().includes(search.toLowerCase())
  );

  // Xử lý khi nhấn nút hoặc Enter
  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-4xl mx-auto p-4">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-lg p-4">
                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div  className="max-w-7xl mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Khám Phá Huế
        </h1>
        {/* Thanh tìm kiếm */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Tìm kiếm địa điểm..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            Tìm kiếm
          </button>
        </div>
        <div className="space-y-6">
          {filteredLocations.length === 0 ? (
            <div className="text-center text-gray-500">Không tìm thấy địa điểm phù hợp.</div>
          ) : (
            filteredLocations.map((location) => (
              <div className="w-full my-6">
                <LocationCard key={location.location_ID} location={location} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
