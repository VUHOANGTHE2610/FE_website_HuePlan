import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Timeline from "../pages/Timeline";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/timeline" element={<Timeline/>}/>
    </Routes>
  );
};

export default AppRoutes;
