import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import TripPlan from "../pages/Trip_Calendar";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/calendar" element={<TripPlan/>} />
    </Routes>
  );
};

export default AppRoutes;
