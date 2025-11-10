"use client";

import { useState, useMemo } from "react";
import { Product } from "@/app/components/FeaturedProducts/useFeaturedProducts";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export const useProductDetail = (productId: string) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description");

  // Mock product data
  const product: Product & {
    images: string[];
    description: string;
    features: string[];
    specs: { [key: string]: string };
    inStock: number;
  } = useMemo(
    () => ({
      id: parseInt(productId),
      name: "Sofa Hiện Đại Milan Premium",
      category: "sofa",
      price: 15000000,
      originalPrice: 18000000,
      rating: 4.8,
      reviews: 124,
      isNew: true,
      discount: 17,
      image: "/images/sofa-1.jpg",
      images: [
        "/images/sofa-1.jpg",
        "/images/sofa-2.jpg",
        "/images/sofa-3.jpg",
        "/images/sofa-4.jpg",
      ],
      description: `
      Sofa Milan Premium là sự kết hợp hoàn hảo giữa thiết kế hiện đại và sự thoải mái tuyệt đối. 
      Được làm từ chất liệu vải bọc cao cấp, khung gỗ tự nhiên chắc chắn và đệm mút memory foam 
      mang lại trải nghiệm ngồi êm ái cho cả gia đình.
      
      Thiết kế tối giản với đường nét tinh tế, sofa không chỉ là món nội thất mà còn là điểm nhấn 
      nghệ thuật cho không gian phòng khách của bạn.
    `,
      features: [
        "Khung gỗ tự nhiên cao cấp, chắc chắn",
        "Vải bọc nhập khẩu, dễ vệ sinh",
        "Đệm mút memory foam êm ái",
        "Thiết kế hiện đại, sang trọng",
        "Bảo hành 5 năm",
        "Miễn phí vận chuyển và lắp đặt",
      ],
      specs: {
        "Kích thước": "220cm x 90cm x 85cm",
        "Chất liệu khung": "Gỗ sồi tự nhiên",
        "Chất liệu đệm": "Mút memory foam",
        "Chất liệu bọc": "Vải nhung cao cấp",
        "Màu sắc": "Xám, Be, Xanh Navy",
        "Trọng lượng": "65kg",
        "Xuất xứ": "Việt Nam",
        "Bảo hành": "5 năm",
      },
      inStock: 25,
    }),
    [productId]
  );

  const reviews: Review[] = useMemo(
    () => [
      {
        id: 1,
        author: "Nguyễn Văn A",
        rating: 5,
        date: "15/10/2024",
        comment:
          "Sản phẩm rất đẹp và chất lượng. Đệm ngồi rất êm, giao hàng nhanh chóng.",
        avatar: "👨",
      },
      {
        id: 2,
        author: "Trần Thị B",
        rating: 4,
        date: "20/10/2024",
        comment: "Sofa đẹp, chất liệu tốt. Giá hơi cao nhưng xứng đáng.",
        avatar: "👩",
      },
      {
        id: 3,
        author: "Lê Văn C",
        rating: 5,
        date: "25/10/2024",
        comment:
          "Tuyệt vời! Đội ngũ lắp đặt rất chuyên nghiệp. Highly recommend!",
        avatar: "👨‍💼",
      },
    ],
    []
  );

  const relatedProducts: Product[] = useMemo(
    () => [
      {
        id: 2,
        name: "Bàn Coffee Hiện Đại",
        category: "living",
        price: 5500000,
        image: "/images/table-2.jpg",
        rating: 4.7,
        reviews: 89,
      },
      {
        id: 3,
        name: "Ghế Armchair Velvet",
        category: "sofa",
        price: 6500000,
        originalPrice: 8000000,
        image: "/images/chair-1.jpg",
        rating: 4.9,
        reviews: 156,
        discount: 19,
      },
      {
        id: 4,
        name: "Kệ Tivi Gỗ Walnut",
        category: "living",
        price: 9500000,
        image: "/images/tv-stand-1.jpg",
        rating: 4.6,
        reviews: 92,
        isNew: true,
      },
      {
        id: 5,
        name: "Thảm Trang Trí Luxury",
        category: "living",
        price: 3500000,
        image: "/images/rug-1.jpg",
        rating: 4.8,
        reviews: 134,
      },
    ],
    []
  );

  const increaseQuantity = () => {
    if (quantity < product.inStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = () => {
    // Implement add to cart logic
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  return {
    product,
    selectedImage,
    setSelectedImage,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    activeTab,
    setActiveTab,
    reviews,
    relatedProducts,
  };
};
