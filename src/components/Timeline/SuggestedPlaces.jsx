import React, { useState, useEffect } from 'react';
import { getAllLocationsTrue, getAllLocationsByID } from '../../services/locationService';
import { getAllCategories } from '../../services/categoryService';

const SuggestedPlaces = ({ onSelectPlace }) => {
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Locations
  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (!selectedCategory) {
          data = await getAllLocationsTrue();
        } else {
          data = await getAllLocationsByID(selectedCategory);
        }
        setLocations(data);
      } catch (err) {
        setError('Không thể lấy danh sách địa điểm');
        console.error('Error fetching locations:', err);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [selectedCategory]);

  // Filter locations by search term
  const filteredPlaces = locations.filter((location) =>
    location.location_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-lg p-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Địa điểm đề xuất</h3>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm địa điểm..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            !selectedCategory
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tất cả
        </button>
        {categories.map((category) => (
          <button
            key={category.category_ID}
            onClick={() => setSelectedCategory(category.category_ID)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedCategory === category.category_ID
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.category_Name}
          </button>
        ))}
      </div>

      {/* Location List */}
      <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
        {filteredPlaces.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            Không tìm thấy địa điểm phù hợp
          </div>
        ) : (
          filteredPlaces.map((location) => (
            <div
              key={location.location_ID}
              onClick={() => onSelectPlace(location.location_Name, location.location_Address, location.location_Cost)}
              className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src={location.location_Image || 'https://via.placeholder.com/100'}
                    alt={location.location_Name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {location.location_Name}
                  </h4>
                  <p className="text-sm text-gray-600 truncate">
                    {location.location_Address}
                  </p>
                  {location.location_Cost && (
                    <p className="text-sm text-purple-600 mt-1">
                      {location.location_Cost.toLocaleString('vi-VN')} VNĐ
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SuggestedPlaces;