"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProducts } from "./useProducts";
import { useShop } from "@/app/context/ShopContext";
import { Product } from "@/app/components/FeaturedProducts/useFeaturedProducts";
import styles from "./products.module.scss";
import { useRouter } from "next/navigation";
import { showSuccess } from "../utils/Toast/toast";

const Products = () => {
  const {
    products,
    filters,
    updateFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalProducts,
  } = useProducts();

  const { addToFavorites, removeFromFavorites, isFavorite, addToCart } =
    useShop();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    { value: "all", label: "Tất Cả Sản Phẩm", count: 12 },
    { value: "sofa", label: "Sofa & Ghế", count: 3 },
    { value: "bedroom", label: "Phòng Ngủ", count: 3 },
    { value: "dining", label: "Phòng Ăn", count: 2 },
    { value: "office", label: "Văn Phòng", count: 2 },
    { value: "living", label: "Phòng Khách", count: 2 },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleToggleFavorite = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showSuccess(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <div className={styles.products}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/">Trang Chủ</Link>
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span>Sản Phẩm</span>
          </div>
          <h1 className={styles.title}>Khám Phá Bộ Sưu Tập</h1>
          <p className={styles.subtitle}>
            Tìm kiếm những món nội thất hoàn hảo cho không gian sống của bạn
          </p>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Sidebar Filters */}
          <div className={styles.sidebar}>
            {/* Search */}
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Tìm Kiếm</h3>
              <div className={styles.searchBox}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Danh Mục</h3>
              <div className={styles.categoryList}>
                {categories.map((cat) => (
                  <div
                    key={cat.value}
                    className={`${styles.categoryItem} ${
                      filters.category === cat.value ? styles.active : ""
                    }`}
                    onClick={() => updateFilter("category", cat.value)}
                  >
                    <span>{cat.label}</span>
                    <span className={styles.count}>({cat.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Khoảng Giá</h3>
              <div className={styles.priceRange}>
                <div className={styles.priceInputs}>
                  <div>
                    <label>Từ</label>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        updateFilter("priceRange", [
                          Number(e.target.value),
                          filters.priceRange[1],
                        ])
                      }
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label>Đến</label>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        updateFilter("priceRange", [
                          filters.priceRange[0],
                          Number(e.target.value),
                        ])
                      }
                      placeholder="50,000,000"
                    />
                  </div>
                </div>
                <div className={styles.priceSlider}>
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="1000000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      updateFilter("priceRange", [
                        filters.priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                  />
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              className={styles.resetButton}
              onClick={() => {
                updateFilter("category", "all");
                updateFilter("priceRange", [0, 50000000]);
                updateFilter("search", "");
                updateFilter("sortBy", "featured");
              }}
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Đặt Lại Bộ Lọc
            </button>
          </div>

          {/* Products Grid */}
          <div className={styles.mainContent}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.results}>
                Hiển thị <strong>{products.length}</strong> trên{" "}
                <strong>{totalProducts}</strong> sản phẩm
              </div>

              <div className={styles.toolbarRight}>
                {/* View Mode Toggle */}
                <div className={styles.viewMode}>
                  <button
                    className={`${styles.viewButton} ${
                      viewMode === "grid" ? styles.active : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    className={`${styles.viewButton} ${
                      viewMode === "list" ? styles.active : ""
                    }`}
                    onClick={() => setViewMode("list")}
                    title="List View"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>

                {/* Sort By */}
                <div className={styles.sortBy}>
                  <label>Sắp xếp:</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter("sortBy", e.target.value)}
                  >
                    <option value="featured">Nổi Bật</option>
                    <option value="newest">Mới Nhất</option>
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                    <option value="rating">Đánh Giá Cao</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={`${styles.grid} ${
                viewMode === "list" ? styles.listView : ""
              }`}
            >
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={`${styles.productCard} ${
                    viewMode === "list" ? styles.listCard : ""
                  }`}
                >
                  <div className={styles.productImage}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Badges */}
                    <div className={styles.badges}>
                      {product.isNew && (
                        <span className={`${styles.badge} ${styles.new}`}>
                          Mới
                        </span>
                      )}
                      {product.discount && (
                        <span className={`${styles.badge} ${styles.discount}`}>
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className={styles.quickActions}>
                      <button
                        className={`${styles.actionButton} ${
                          isMounted && isFavorite(product.id)
                            ? styles.active
                            : ""
                        }`}
                        onClick={(e) => handleToggleFavorite(product, e)}
                        title={
                          isMounted && isFavorite(product.id)
                            ? "Xóa khỏi yêu thích"
                            : "Thêm vào yêu thích"
                        }
                      >
                        <svg
                          fill={
                            isMounted && isFavorite(product.id)
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>

                      <button
                        className={styles.actionButton}
                        onClick={(e) => handleAddToCart(product, e)}
                        title="Thêm vào giỏ hàng"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // tránh xung đột nếu button nằm trong phần tử có onClick
                          router.push(`/products/${product.id}`);
                        }}
                        className={styles.actionButton}
                        title="Xem chi tiết"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className={styles.productInfo}>
                    <div className={styles.productCategory}>
                      {categories.find((c) => c.value === product.category)
                        ?.label || product.category}
                    </div>
                    <h3 className={styles.productName}>{product.name}</h3>

                    <div className={styles.rating}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            fill={
                              i < Math.floor(product.rating)
                                ? "currentColor"
                                : "none"
                            }
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                      <span>
                        {product.rating} ({product.reviews} đánh giá)
                      </span>
                    </div>

                    <div className={styles.priceContainer}>
                      <span className={styles.price}>
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className={styles.originalPrice}>
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.pageButton} ${
                      currentPage === index + 1 ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* No Results */}
            {products.length === 0 && (
              <div className={styles.noResults}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Vui lòng thử điều chỉnh bộ lọc hoặc tìm kiếm khác</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
