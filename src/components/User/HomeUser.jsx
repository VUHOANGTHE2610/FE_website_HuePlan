
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from "../Common/Header";

const HomeUser = () => {
  const { user } = useContext(AuthContext);

  // Dữ liệu giả lập cho gợi ý lịch trình và bài viết
  const recommendations = [
    {
      id: 1,
      title: "Hành trình 3 ngày khám phá Huế",
      description: "Tham quan Kinh Thành Huế, chùa Thiên Mụ và thưởng thức ẩm thực địa phương.",
      image: "/images/kinh-thanh-hue.jpg",
    },
    {
      id: 2,
      title: "Tour sông Hương về đêm",
      description: "Trải nghiệm thuyền rồng trên sông Hương, nghe ca Huế và ngắm cảnh đêm.",
      image: "/images/KinhThanh2.jpg",
    },
  ];

  const posts = [
    {
      id: 1,
      title: "Top 5 món ăn đặc sản Huế bạn phải thử",
      excerpt: "Từ bún bò Huế đến bánh khoái, khám phá ẩm thực cố đô.",
      image: "/images/bun-bo-hue.jpg",
    },
    {
      id: 2,
      title: "Lễ hội đèn lồng Huế 2025",
      excerpt: "Tham gia lễ hội đèn lồng rực rỡ, một sự kiện văn hóa đặc sắc.",
      image: "/images/den-long-hue.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4 max-w-screen-lg mx-auto">
        {/* Lời chào cá nhân hóa */}
        <h1 className="text-3xl font-bold mb-6 text-purple-700 text-center">
          Chào mừng {user?.userName || "Khách"}, khám phá Huế cùng HuePlan!
        </h1>

        {/* Gợi ý lịch trình */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Gợi ý lịch trình cho bạn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <a
                    href="#"
                    className="text-purple-600 font-medium hover:underline"
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bài viết nổi bật */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Bài viết nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <a
                    href="#"
                    className="text-purple-600 font-medium hover:underline"
                  >
                    Đọc thêm
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeUser;
