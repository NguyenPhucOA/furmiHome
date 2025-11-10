"use client";

import { useState } from "react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discount?: number;
}

export const useFeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Mock data - trong thực tế sẽ fetch từ API
  const products: Product[] = [
    {
      id: 1,
      name: "Sofa Hiện Đại",
      category: "sofa",
      price: 15000000,
      originalPrice: 18000000,
      image:
        "https://sabdullahome.com/wp-content/uploads/2024/05/lentocornersofaamb2.jpg",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      discount: 17,
    },

    {
      id: 2,
      name: "Bàn Ăn Gỗ Sồi",
      category: "dining",
      price: 12000000,
      image:
        "https://sabdullahome.com/wp-content/uploads/2024/05/lentocornersofaamb2.jpg",
      rating: 4.9,
      reviews: 89,
      isNew: false,
    },
    {
      id: 3,
      name: "Giường Ngủ Cao Cấp",
      category: "bedroom",
      price: 25000000,
      originalPrice: 30000000,
      image:
        "https://sabdullahome.com/wp-content/uploads/2024/05/lentocornersofaamb2.jpg",
      rating: 4.7,
      reviews: 156,
      discount: 17,
    },
    {
      id: 4,
      name: "Tủ Quần Áo 4 Cánh",
      category: "bedroom",
      price: 18000000,
      image:
        "https://sabdullahome.com/wp-content/uploads/2024/05/lentocornersofaamb2.jpg",
      rating: 4.6,
      reviews: 92,
      isNew: true,
    },
    {
      id: 5,
      name: "Bàn Làm Việc",
      category: "office",
      price: 8000000,
      image:
        "https://sabdullahome.com/wp-content/uploads/2024/05/lentocornersofaamb2.jpg",
      rating: 4.8,
      reviews: 203,
    },
    {
      id: 6,
      name: "Ghế Armchair",
      category: "sofa",
      price: 6500000,
      originalPrice: 8000000,
      image:
        "https://sabdullahome.com/wp-content/uploads/2024/05/lentocornersofaamb2.jpg",
      rating: 4.9,
      reviews: 178,
      discount: 19,
    },
    {
      id: 7,
      name: "Kệ Tivi Gỗ",
      category: "living",
      price: 9500000,
      image:
        "https://sabdullahome.com/wp-content/uploads/2024/05/lentocornersofaamb2.jpg",
      rating: 4.7,
      reviews: 134,
      isNew: true,
    },
    {
      id: 8,
      name: "Bộ Bàn Ghế Cafe",
      category: "dining",
      price: 7000000,
      image:
        "https://sabdullahome.com/wp-content/uploads/2024/05/lentocornersofaamb2.jpg",
      rating: 4.8,
      reviews: 167,
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = [
    { id: "all", name: "Tất Cả" },
    { id: "sofa", name: "Sofa" },
    { id: "dining", name: "Bàn Ăn" },
    { id: "bedroom", name: "Phòng Ngủ" },
    { id: "office", name: "Văn Phòng" },
    { id: "living", name: "Phòng Khách" },
  ];

  return {
    products: filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    hoveredProduct,
    setHoveredProduct,
  };
};
