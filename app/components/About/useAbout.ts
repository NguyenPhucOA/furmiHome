"use client";

import { useState } from "react";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const useAbout = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const features: Feature[] = [
    {
      id: 1,
      icon: "✨",
      title: "Chất Lượng Cao Cấp",
      description:
        "Sản phẩm được chọn lọc kỹ từ những thương hiệu uy tín hàng đầu",
    },
    {
      id: 2,
      icon: "🚚",
      title: "Giao Hàng Miễn Phí",
      description: "Miễn phí vận chuyển cho đơn hàng trên 10 triệu đồng",
    },
    {
      id: 3,
      icon: "💎",
      title: "Bảo Hành Dài Hạn",
      description: "Bảo hành chính hãng lên đến 5 năm cho mọi sản phẩm",
    },
    {
      id: 4,
      icon: "🎨",
      title: "Tư Vấn Miễn Phí",
      description: "Đội ngũ chuyên gia hỗ trợ thiết kế không gian 24/7",
    },
  ];

  const stats = [
    { label: "Khách Hàng", value: "10,000+", icon: "👥" },
    { label: "Sản Phẩm", value: "5,000+", icon: "🛋️" },
    { label: "Đối Tác", value: "150+", icon: "🤝" },
    { label: "Năm Kinh Nghiệm", value: "15+", icon: "⭐" },
  ];

  return {
    features,
    stats,
    activeFeature,
    setActiveFeature,
  };
};
