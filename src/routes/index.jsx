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
import LocationManager from "../components/Admin/LocationManager";
import LocationForm from "../components/Admin/LocationForm";
import UserManager from "../components/Admin/UserManager";
import BusinessHome from "../pages/BusinessHome";
import BusinessLocationManager from "../components/Business/BusinessLocationManager";
import BusinessLocationForm from "../components/Business/BusinessLocationForm";
import CategoryManager from "../components/Admin/CategoryManager";
import CategoryForm from "../components/Admin/CategoryForm";
import PendingLocationManager from "../components/Admin/PendingLocationManager";

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
      <Route path="/business/locations" element={<BusinessHome content={<BusinessLocationManager />} />} />
      <Route path="/business/locations/new" element={<BusinessHome content={<BusinessLocationForm />} />} />
      <Route path="/business/locations/edit/:id" element={<BusinessHome content={<BusinessLocationForm />} />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/overview" element={<AdminHome />} />
      <Route path="/admin/locations" element={<AdminHome content={<LocationManager />} />} />
      <Route path="/admin/locations/new" element={<AdminHome content={<LocationForm />} />} />
      <Route path="/admin/locations/edit/:id" element={<AdminHome content={<LocationForm />} />} />
      <Route path="/admin/pending-locations" element={<AdminHome content={<PendingLocationManager />} />} />
      <Route path="/admin/users" element={<AdminHome content={<UserManager />} />} />
      <Route path="/admin/categories" element={<AdminHome content={<CategoryManager />} />} />
      <Route path="/admin/categories/new" element={<AdminHome content={<CategoryForm />} />} />
      <Route path="/admin/categories/edit/:id" element={<AdminHome content={<CategoryForm />} />} />

      {/* Chuyển hướng mặc định nếu không khớp route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};  

export default AppRoutes;