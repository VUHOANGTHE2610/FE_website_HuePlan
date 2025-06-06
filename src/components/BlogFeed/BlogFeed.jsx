import React, { useState, useEffect } from 'react';
import Header from '../Common/Header';
import LocationCard from '../Location/LocationCard';
import { getAllLocationsTrue, getAllLocationsByID } from '../../services/locationService';
import { getAllCategories } from '../../services/categoryService';

export default function BlogFeed() {
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // Changed to single category

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

  // Fetch Locations based on selected category or fetch all true locations
  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (!selectedCategory) {
          // Fetch all approved locations if no category is selected
          data = await getAllLocationsTrue();
        } else {
          // Fetch locations for selected category
          data = await getAllLocationsByID(selectedCategory);
        }
        console.log('API location response:', data);
        setLocations(data);
      } catch (err) {
        setError('Không thể lấy danh sách địa điểm');
        console.error('Error fetching locations:', err);
        setLocations([]); // Clear locations on error
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [selectedCategory]); // Re-run when selectedCategory changes

  // Handle Search Input
  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle Category Filter Click
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
    setSearch(""); // Clear search when changing category filter
    setSearchInput("");
  };

  // Filter locations by search term (applies to the currently displayed locations)
  const filteredLocations = locations.filter((location) =>
    location.location_Name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto p-4">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row">
                 <div className="md:w-1/3 w-full h-48 md:h-64 bg-gray-200 rounded-lg mb-4 md:mb-0 md:mr-4"></div>
                 <div className="md:w-2/3 w-full space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>
                 </div>
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
        <div className="max-w-7xl mx-auto p-4">
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

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Tìm kiếm địa điểm..."
            className="w-full sm:max-w-sm px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
           <button
              key="all"
              onClick={() => setSelectedCategory(null)} // Clear selected category
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                !selectedCategory
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tất cả
            </button>
          {categories.map((category) => (
            <button
              key={category.category_ID}
              onClick={() => handleCategoryClick(category.category_ID)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedCategory === category.category_ID
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.category_Name}
            </button>
          ))}
        </div>

        {/* Location List */}
        <div className="space-y-6">
          {filteredLocations.length === 0 ? (
            <div className="text-center text-gray-500">Không tìm thấy địa điểm phù hợp.</div>
          ) : (
            filteredLocations.map((location) => (
              <div key={location.location_ID} className="w-full">
                <LocationCard location={location} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
