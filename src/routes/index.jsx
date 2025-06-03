import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/HomeDefault";
import TimelineDetail from "../pages/TimelineDetail";
import UserProfile from "../pages/UserProfile";
import TimelineList from "../pages/TimelineList";
import UserHome from "../pages/UserHome";
import BusinessHomePage from "../pages/BusinessHome";
import BlogFeedPage from "../pages/BlogFeedPage";
import AdminHome from "../components/Admin/AdminHome";
import BusinessManager from "../components/Admin/BusinessManager";
import LocationManager from "../components/Admin/LocationManager";
import LocationForm from "../components/Admin/LocationForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/** Không cần đăng Nhập **/}
      <Route path="/" element={<Navigate to="/homedefault" replace />} />
      <Route path="/homedefault" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogfeed" element={<BlogFeedPage />} />

      {/* Client */}
      <Route path="/profile-user" element={<UserProfile />} />
      <Route path="/UserHome" element={<UserHome />} />
      <Route path="/timeline" element={<TimelineList />} />
      <Route path="/timelines/:timelineId" element={<TimelineDetail />} />

      {/* Business */}
      <Route path="/BusinessHome" element={<BusinessHomePage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/overview" element={<AdminHome />} />
      <Route path="/admin/businessManager" element={<AdminHome content={<BusinessManager />} />} />
      <Route path="/admin/locations" element={<AdminHome content={<LocationManager />} />} />
      <Route path="/admin/locations/new" element={<AdminHome content={<LocationForm />} />} />
      <Route path="/admin/locations/edit/:id" element={<AdminHome content={<LocationForm />} />} />

      {/* Chuyển hướng mặc định nếu không khớp route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};  

export default AppRoutes;