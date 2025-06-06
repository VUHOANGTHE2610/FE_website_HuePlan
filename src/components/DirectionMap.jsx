import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Openrouteservice from 'openrouteservice-js';

const DirectionMap = ({ destination, onClose }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  // Lấy API key từ biến môi trường
  const apiKey = import.meta.env.VITE_OPENROUTE_API_KEY;

  // Lấy tọa độ điểm đến từ địa chỉ
  useEffect(() => {
    if (!destination || !destination.address) {
      setError('Không có địa chỉ để chỉ đường!');
      setLoading(false);
      return;
    }
    const getCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination.address)}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setDestinationCoords({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        } else {
          setError('Không tìm thấy tọa độ cho địa chỉ này!');
          setLoading(false);
        }
      } catch (err) {
        setError('Lỗi khi lấy tọa độ: ' + err.message);
        setLoading(false);
      }
    };
    getCoordinates();
  }, [destination]);

  // Lấy vị trí hiện tại của người dùng
  useEffect(() => {
    if (!apiKey) {
      setError('API key không được cấu hình!');
      setLoading(false);
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError('Không thể lấy vị trí của bạn: ' + err.message);
          setLoading(false);
        }
      );
    } else {
      setError('Trình duyệt không hỗ trợ geolocation!');
      setLoading(false);
    }
  }, [apiKey]);

  // Khởi tạo bản đồ
  useEffect(() => {
    if (!mapContainer.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [107.5847, 16.4637], // Huế mặc định
      zoom: 13,
    });
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.on('load', () => setLoading(false));
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Vẽ tuyến đường khi đã có đủ thông tin
  useEffect(() => {
    if (!userLocation || !destinationCoords || !map.current) return;
    setLoading(true);
    const Directions = new Openrouteservice.Directions({ api_key: apiKey });
    Directions.calculate({
      coordinates: [
        [userLocation.lng, userLocation.lat],
        [destinationCoords.lng, destinationCoords.lat],
      ],
      profile: 'driving-car',
      format: 'geojson',
    })
      .then((response) => {
        // Xóa route cũ nếu có
        if (map.current.getSource('route')) {
          map.current.removeLayer('route');
          map.current.removeSource('route');
        }
        map.current.addSource('route', {
          type: 'geojson',
          data: response,
        });
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#0080ff',
            'line-width': 5,
          },
        });
        // Marker vị trí người dùng
        new maplibregl.Marker({ color: '#FF0000' })
          .setLngLat([userLocation.lng, userLocation.lat])
          .setPopup(new maplibregl.Popup().setText('Vị trí của bạn'))
          .addTo(map.current);
        // Marker điểm đến
        new maplibregl.Marker({ color: '#00FF00' })
          .setLngLat([destinationCoords.lng, destinationCoords.lat])
          .setPopup(new maplibregl.Popup().setText('Điểm đến'))
          .addTo(map.current);
        // Fit bounds
        const bounds = new maplibregl.LngLatBounds();
        response.features[0].geometry.coordinates.forEach((coord) => {
          bounds.extend(coord);
        });
        map.current.fitBounds(bounds, { padding: 60 });
        // Lưu thông tin quãng đường
        const summary = response.features[0].properties.summary;
        setRouteInfo({
          distance: summary.distance / 1000, // km
          duration: summary.duration / 60, // phút
        });
        setLoading(false);
      })
      .catch((err) => {
        setError('Không thể lấy chỉ đường: ' + err.message);
        setLoading(false);
      });
  }, [userLocation, destinationCoords, apiKey]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-[90vw] h-[90vh] relative flex flex-col shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
        >
          ✕
        </button>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-20">
            Đang tải bản đồ...
          </div>
        )}
        {error && (
          <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-700 p-2 z-20">
            {error}
          </div>
        )}
        <div ref={mapContainer} className="w-full h-full rounded-lg" />
        {routeInfo && !loading && !error && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-lg px-6 py-2 shadow text-center text-base font-semibold text-blue-700 z-20">
            Quãng đường: {routeInfo.distance.toFixed(2)} km &nbsp;|&nbsp; Thời gian: {routeInfo.duration.toFixed(0)} phút
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectionMap;