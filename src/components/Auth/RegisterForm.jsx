import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!username || !email || !password || !confirmPassword) {
        throw new Error("Vui lòng nhập đầy đủ thông tin");
      }
      if (password !== confirmPassword) {
        throw new Error("Mật khẩu không khớp");
      }

      // TODO: Gọi API đăng ký nếu có backend

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(75, 0, 130, 0.5), rgba(138, 43, 226, 0.5)), url('/images/kinh-thanh-hue.jpg')",
      }}
    >
      {/* Tên trang web */}
      <div className="absolute top-10 text-white text-7xl font-extrabold tracking-widest drop-shadow-lg text-center animate-fadeIn">
        HuePlan
      </div>

      {/* Form đăng ký */}
      <div className="relative w-full max-w-md bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl drop-shadow-xl z-10">
        <h2 className="text-2xl font-bold text-center text-purple-700">Đăng Ký</h2>

        <form onSubmit={handleRegister} className="mt-4">
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Tên đăng nhập</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          >
            {isLoading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>

        {/* 🔥 Chuyển về trang Đăng nhập */}
        <p className="mt-4 text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-purple-600 font-medium hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
