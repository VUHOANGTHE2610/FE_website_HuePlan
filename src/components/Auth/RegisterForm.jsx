import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../services/eventService";

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("client");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Kiểm tra đầu vào
      if (!userName || !userEmail || !userPassword || !confirmPassword) {
        throw new Error("Vui lòng nhập đầy đủ thông tin cơ bản");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        throw new Error("Email không hợp lệ");
      }
      if (userPassword.length < 6) {
        throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
      }
      if (userPassword !== confirmPassword) {
        throw new Error("Mật khẩu không khớp");
      }
      if (role === "business") {
        if (!businessName || !businessLocation || !businessPhone) {
          throw new Error("Vui lòng nhập đầy đủ thông tin doanh nghiệp (Tên, Địa điểm, Số điện thoại)");
        }
        const phoneRegex = /^\+?\d{10,15}$/;
        if (!phoneRegex.test(businessPhone)) {
          throw new Error("Số điện thoại không hợp lệ");
        }
      }

      const userData = {
        userName,
        userEmail,
        userPassword,
        role,
        ...(role === "business" && {
          business: {
            business_name: businessName,
            business_location: businessLocation,
            business_phone: businessPhone,
            business_description: businessDescription || null,
            cost: cost ? parseFloat(cost) : null,
            business_photo: null,
          },
        }),
      };

      const response = await registerUser(userData);
      console.log("Đăng ký thành công:", response);

      setIsLoading(false);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    } catch (err) {
      let errorMessage = err.message;
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.errors) {
        errorMessage = Object.entries(err.response.data.errors)
          .map(([field, message]) => `${field}: ${message}`)
          .join("; ");
      }
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(75, 0, 130, 0.5), rgba(138, 43, 226, 0.5)), url('/images/kinh-thanh-hue.jpg')",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-widest drop-shadow-lg animate-fadeIn">
              HuePlan
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white font-serif italic drop-shadow-md">
              Khám phá Huế theo cách của bạn, HuePlan là không giới hạn!
            </p>
          </div>

          <div className="flex justify-center">
            <div
              className={`bg-white bg-opacity-90 p-6 rounded-lg shadow-2xl drop-shadow-xl transition-all duration-300 ${
                role === "business" ? "w-full" : "w-full md:w-3/4"
              }`}
            >
              <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Đăng Ký</h2>

              <form onSubmit={handleRegister}>
                {error && (
                  <div className="mb-4 text-red-500 text-sm bg-red-100 p-2 rounded">{error}</div>
                )}

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Tên đăng nhập</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nhập tên đăng nhập"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nhập email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nhập mật khẩu"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="flex items-center text-gray-700 font-medium">
                    <input
                      type="checkbox"
                      className="mr-2 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      checked={role === "business"}
                      onChange={(e) => setRole(e.target.checked ? "business" : "client")}
                    />
                    Đăng ký với vai trò Doanh nghiệp (Business)
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Nếu không chọn, bạn sẽ đăng ký với vai trò Khách hàng (Client).
                  </p>
                </div>

                {role === "business" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-2">
                        Thông tin doanh nghiệp
                      </h3>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Tên doanh nghiệp</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Nhập tên doanh nghiệp"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Địa điểm</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Nhập địa điểm"
                          value={businessLocation}
                          onChange={(e) => setBusinessLocation(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Nhập số điện thoại"
                          value={businessPhone}
                          onChange={(e) => setBusinessPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Mô tả (Tùy chọn)</label>
                        <textarea
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Nhập mô tả doanh nghiệp"
                          value={businessDescription}
                          onChange={(e) => setBusinessDescription(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Chi phí (Tùy chọn)</label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Nhập chi phí"
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    "Đăng Ký"
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-gray-600">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-purple-600 font-medium hover:underline">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;