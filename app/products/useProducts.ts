"use client";

import { useState, useMemo } from "react";
import { Product } from "@/app/components/FeaturedProducts/useFeaturedProducts";

interface FilterState {
  category: string;
  priceRange: [number, number];
  sortBy: string;
  search: string;
}

export const useProducts = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 50000000],
    sortBy: "featured",
    search: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const allProducts: Product[] = useMemo(
    () => [
      {
        id: 1,
        name: "Sofa Hiện Đại Milan",
        category: "sofa",
        price: 15000000,
        originalPrice: 18000000,
        image: "/images/sofa-1.jpg",
        rating: 4.8,
        reviews: 124,
        isNew: true,
        discount: 17,
      },
      {
        id: 2,
        name: "Bàn Ăn Gỗ Sồi Tự Nhiên",
        category: "dining",
        price: 12000000,
        image: "/images/table-1.jpg",
        rating: 4.9,
        reviews: 89,
      },
      {
        id: 3,
        name: "Giường Ngủ Cao Cấp Aurora",
        category: "bedroom",
        price: 25000000,
        originalPrice: 30000000,
        image: "/images/bed-1.jpg",
        rating: 4.7,
        reviews: 156,
        discount: 17,
      },
      {
        id: 4,
        name: "Tủ Quần Áo 4 Cánh Luxury",
        category: "bedroom",
        price: 18000000,
        image: "/images/wardrobe-1.jpg",
        rating: 4.6,
        reviews: 92,
        isNew: true,
      },
      {
        id: 5,
        name: "Bàn Làm Việc Ergonomic",
        category: "office",
        price: 8000000,
        image: "/images/desk-1.jpg",
        rating: 4.8,
        reviews: 203,
      },
      {
        id: 6,
        name: "Ghế Armchair Velvet",
        category: "sofa",
        price: 6500000,
        originalPrice: 8000000,
        image: "/images/chair-1.jpg",
        rating: 4.9,
        reviews: 178,
        discount: 19,
      },
      {
        id: 7,
        name: "Kệ Tivi Gỗ Walnut",
        category: "living",
        price: 9500000,
        image: "/images/tv-stand-1.jpg",
        rating: 4.7,
        reviews: 134,
        isNew: true,
      },
      {
        id: 8,
        name: "Bộ Bàn Ghế Cafe Nordic",
        category: "dining",
        price: 7000000,
        image: "/images/cafe-set-1.jpg",
        rating: 4.8,
        reviews: 167,
      },
      {
        id: 9,
        name: "Sofa Góc L Shape Premium",
        category: "sofa",
        price: 28000000,
        originalPrice: 35000000,
        image: "/images/sofa-2.jpg",
        rating: 4.9,
        reviews: 201,
        discount: 20,
      },
      {
        id: 10,
        name: "Bàn Console Hiện Đại",
        category: "living",
        price: 5500000,
        image: "/images/console-1.jpg",
        rating: 4.6,
        reviews: 78,
      },
      {
        id: 11,
        name: "Ghế Văn Phòng Executive",
        category: "office",
        price: 4500000,
        image: "/images/office-chair-1.jpg",
        rating: 4.8,
        reviews: 156,
        isNew: true,
      },
      {
        id: 12,
        name: "Tủ Đầu Giường Scandinavian",
        category: "bedroom",
        price: 3500000,
        image: "/images/nightstand-1.jpg",
        rating: 4.7,
        reviews: 92,
      },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by category
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Filter by price range
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by search
    if (filters.search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // featured - no sorting
        break;
    }

    return result;
  }, [filters, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateFilter = (
    key: keyof FilterState,
    value: string | [number, number]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return {
    products: paginatedProducts,
    filters,
    updateFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalProducts: filteredProducts.length,
  };
};
