import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import TimelineDetail from "../pages/TimelineDetail";
import UserProfile from "../pages/UserProfile"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace/>} />
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register />} />
      <Route path="/timeline" element={<TimelineDetail/>}/>
      {/* Trang thông tin cá nhân */}
      <Route path="/profile" element={<UserProfile />} />
      {/* Chuyển hướng mặc định nếu không khớp route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
