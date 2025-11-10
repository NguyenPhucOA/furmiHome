"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProductDetail } from "./useProductDetail";
import styles from "./productDetail.module.scss";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
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
  } = useProductDetail(id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
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
          <Link href="/products">Sản Phẩm</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span>{product.name}</span>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={styles.thumbnails}>
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.active : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.productInfo}>
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

            <p className={styles.category}>{product.category}</p>
            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    fill={
                      i < Math.floor(product.rating) ? "currentColor" : "none"
                    }
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
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
              <span className={styles.ratingText}>
                {product.rating} ({product.reviews} đánh giá)
              </span>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className={styles.originalPrice}>
                    {formatPrice(product.originalPrice)}
                  </span>
                  <div className={styles.savings}>
                    Tiết kiệm:{" "}
                    {formatPrice(product.originalPrice - product.price)}
                  </div>
                </>
              )}
            </div>

            <div className={styles.stock}>
              ✓ Còn {product.inStock} sản phẩm trong kho
            </div>

            <div className={styles.quantitySection}>
              <label>Số lượng:</label>
              <div className={styles.quantityControl}>
                <div className={styles.quantityButtons}>
                  <button onClick={decreaseQuantity} disabled={quantity <= 1}>
                    −
                  </button>
                  <div className={styles.quantityValue}>{quantity}</div>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.inStock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCartButton} onClick={addToCart}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Thêm Vào Giỏ Hàng
              </button>
              <button className={styles.wishlistButton}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <ul className={styles.features}>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.tabs}>
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "description" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("description")}
            >
              Mô Tả
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "specs" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("specs")}
            >
              Thông Số
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "reviews" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Đánh Giá ({reviews.length})
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "description" && (
              <div className={styles.description}>{product.description}</div>
            )}

            {activeTab === "specs" && (
              <div className={styles.specs}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <div className={styles.specLabel}>{key}</div>
                    <div className={styles.specValue}>{value}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className={styles.reviews}>
                {reviews.map((review) => (
                  <div key={review.id} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>{review.avatar}</div>
                      <div className={styles.reviewInfo}>
                        <div className={styles.author}>{review.author}</div>
                        <div className={styles.date}>{review.date}</div>
                      </div>
                      <div className={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            fill={i < review.rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
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
                    </div>
                    <p className={styles.comment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.relatedProducts}>
          <h2 className={styles.sectionTitle}>Sản Phẩm Liên Quan</h2>
          <div className={styles.grid}>
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className={styles.productCard}
              >
                <div className={styles.productImage}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.category}>{item.category}</p>
                  <h3 className={styles.name}>{item.name}</h3>
                  <div className={styles.rating}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          fill={
                            i < Math.floor(item.rating)
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
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
                    <span>({item.reviews})</span>
                  </div>
                  <div>
                    <span className={styles.price}>
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className={styles.originalPrice}>
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
