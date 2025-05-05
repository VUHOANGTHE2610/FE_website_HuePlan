import AppRoutes from "./routes"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthProvider} from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter> {/* Bọc toàn bộ ứng dụng trong BrowserRouter */}
          <AppRoutes/>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </AuthProvider>
    </div>
      
      
  )
} 

export default App
