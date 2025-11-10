"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/app/context/ShopContext";
import styles from "./favorites.module.scss";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, addToCart } = useShop();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredFavorites = useMemo(() => {
    let filtered = [...favorites];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // newest - no sorting needed
        break;
    }

    return filtered;
  }, [favorites, searchQuery, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = (product: (typeof favorites)[0]) => {
    addToCart(product);
  };

  return (
    <div className={styles.favorites}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/">Trang Chủ</Link>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span>Yêu Thích</span>
          </div>
          <h1 className={styles.title}>Sản Phẩm Yêu Thích</h1>
          <p className={styles.subtitle}>
            Bạn có {favorites.length} sản phẩm trong danh sách yêu thích
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2>Chưa có sản phẩm yêu thích</h2>
            <p>Hãy thêm sản phẩm vào danh sách yêu thích của bạn</p>
            <Link href="/products" className={styles.shopButton}>
              Khám Phá Sản Phẩm
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.toolbar}>
              <div className={styles.searchBox}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm yêu thích..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className={styles.clearButton}
                    onClick={() => setSearchQuery("")}
                  >
                    ×
                  </button>
                )}
              </div>

              <div className={styles.sortBy}>
                <label>Sắp xếp:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Mới nhất</option>
                  <option value="name">Tên A-Z</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                </select>
              </div>
            </div>

            {filteredFavorites.length === 0 ? (
              <div className={styles.noResults}>
                <p>
                  Không tìm thấy sản phẩm nào với từ khóa &quot;{searchQuery}
                  &quot;
                </p>
              </div>
            ) : (
              <div className={styles.grid}>
                {filteredFavorites.map((product) => (
                  <div key={product.id} className={styles.productCard}>
                    <Link
                      href={`/products/${product.id}`}
                      className={styles.productImage}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      {product.discount && (
                        <span className={styles.discount}>
                          -{product.discount}%
                        </span>
                      )}
                    </Link>

                    <button
                      className={styles.removeButton}
                      onClick={() => removeFromFavorites(product.id)}
                      aria-label="Remove from favorites"
                    >
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>

                    <div className={styles.productInfo}>
                      <p className={styles.category}>{product.category}</p>
                      <Link href={`/products/${product.id}`}>
                        <h3 className={styles.name}>{product.name}</h3>
                      </Link>

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
                        <span>({product.reviews})</span>
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

                      <button
                        className={styles.addToCartButton}
                        onClick={() => handleAddToCart(product)}
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Thêm Vào Giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
