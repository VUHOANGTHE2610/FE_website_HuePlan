import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/HomeDefault";
import TimelineDetail from "../pages/TimelineDetail";
import UserProfile from "../pages/UserProfile"
import TimelineList from "../pages/TimelineList";
import UserHome from "../pages/UserHome";
import BusinessHomePage from "../pages/BusinessHome";
import BlogFeedPage from "../pages/BlogFeedPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/** Không cần đăng Nhập **/}
      <Route path="/" element={<Navigate to="/homedefault" replace/>} />
      <Route path="/homedefault" element={<Home/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogfeed" element={<BlogFeedPage />} />
        
      {/* Client */}
      <Route path="/profile-user" element={<UserProfile />} />
      <Route path="/UserHome" element={<UserHome/>}/>
      <Route path="/timeline"element={<TimelineList/>} />
      <Route path="/t" element={<TimelineDetail/>}/>


      {/*Business */}
      <Route path="/BusinessHome" element={<BusinessHomePage/>}/>
      {/* Chuyển hướng mặc định nếu không khớp route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
