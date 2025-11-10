"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Kiểm tra nếu đang ở trang chủ
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { label: "Trang Chủ", href: "/" },
    { label: "Sản Phẩm", href: "/products" },
    { label: "Danh Mục", href: "/categories" },
    { label: "Về Chúng Tôi", href: "/about" },
    { label: "Liên Hệ", href: "/contact" },
  ];

  return {
    isScrolled,
    isMobileMenuOpen,
    toggleMobileMenu,
    navLinks,
    isHomePage,
  };
};
