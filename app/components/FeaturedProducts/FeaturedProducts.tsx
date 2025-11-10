"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFeaturedProducts } from "./useFeaturedProducts";
import { useShop } from "@/app/context/ShopContext";
import styles from "./FeaturedProducts.module.scss";
import EyedetailIcon from "../icons/eyedetail";
import StarIcon from "../icons/StarIcon";
import { showSuccess } from "@/app/utils/Toast/toast";

export const FeaturedProducts: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    setHoveredProduct,
  } = useFeaturedProducts();

  const [isMounted, setIsMounted] = useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { addToFavorites, removeFromFavorites, isFavorite, addToCart } =
    useShop();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleToggleFavorite = (
    product: (typeof products)[0],
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = (
    product: (typeof products)[0],
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showSuccess(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subtitle}>Sản Phẩm Nổi Bật</p>
          <h2 className={styles.title}>Bộ Sưu Tập Mới Nhất</h2>
          <p className={styles.description}>
            Khám phá những sản phẩm nội thất chất lượng cao, thiết kế hiện đại
            phù hợp với mọi không gian
          </p>
        </div>

        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterButton} ${
                selectedCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={styles.productCard}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className={styles.productImage}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                />

                <div className={styles.badges}>
                  {product.isNew && (
                    <span className={`${styles.badge} ${styles.new}`}>New</span>
                  )}
                  {product.discount && (
                    <span className={`${styles.badge} ${styles.discount}`}>
                      -{product.discount}%
                    </span>
                  )}
                </div>

                <div className={styles.quickActions}>
                  <button
                    className={`${styles.actionButton} ${
                      isMounted && isFavorite(product.id) ? styles.active : ""
                    }`}
                    onClick={(e) => handleToggleFavorite(product, e)}
                    aria-label={
                      isMounted && isFavorite(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
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
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Quick view có thể mở modal hoặc navigate
                      window.location.href = `/products/${product.id}`;
                    }}
                    aria-label="Quick view"
                  >
                    <EyedetailIcon />
                  </button>
                </div>
              </div>

              <div className={styles.productInfo}>
                <p className={styles.productCategory}>{product.category}</p>
                <h3 className={styles.productName}>{product.name}</h3>

                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < Math.floor(product.rating)} // tô đầy sao nếu i < rating
                        size={18}
                        color="#fbbf24" // màu vàng
                      />
                    ))}
                  </div>
                  <span className={styles.ratingText}>
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

                <button
                  className={styles.addToCart}
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </Link>
          ))}
        </div>

        <div className={styles.viewAll}>
          <button
            className={styles.viewAllButton}
            onClick={() => (window.location.href = "/products")}
          >
            Xem Tất Cả Sản Phẩm
          </button>
        </div>
      </div>
    </section>
  );
};
