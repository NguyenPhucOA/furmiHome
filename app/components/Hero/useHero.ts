"use client";

import { useState, useEffect } from "react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
}

export const useHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Thiết Kế Hiện Đại",
      subtitle: "Nội Thất Sang Trọng",
      description:
        "Khám phá bộ sưu tập nội thất cao cấp cho không gian sống hoàn hảo",
      image: "/images/hero-1.jpg",
      buttonText: "Khám Phá Ngay",
    },
    {
      id: 2,
      title: "Phong Cách Tối Giản",
      subtitle: "Không Gian Tinh Tế",
      description: "Tạo nên không gian sống tối giản nhưng đầy đủ tiện nghi",
      image: "/images/hero-2.jpg",
      buttonText: "Xem Bộ Sưu Tập",
    },
    {
      id: 3,
      title: "Chất Lượng Cao",
      subtitle: "Giá Cả Hợp Lý",
      description: "Sản phẩm chất lượng với mức giá tốt nhất thị trường",
      image: "/images/hero-3.jpg",
      buttonText: "Mua Ngay",
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  return {
    slides,
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    isAutoPlay,
    setIsAutoPlay,
  };
};
