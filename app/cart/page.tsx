"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/app/context/ShopContext";
import styles from "./cart.module.scss";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, getTotalPrice } =
    useShop();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCart = useMemo(() => {
    if (!searchQuery) return cart;

    return cart.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cart, searchQuery]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert("Chức năng thanh toán đang được phát triển!");
  };

  return (
    <div className={styles.cart}>
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
            <span>Giỏ Hàng</span>
          </div>
          <h1 className={styles.title}>Giỏ Hàng Của Bạn</h1>
          <p className={styles.subtitle}>
            Bạn có {cart.length} sản phẩm trong giỏ hàng
          </p>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2>Giỏ hàng trống</h2>
            <p>Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
            <Link href="/products" className={styles.shopButton}>
              Tiếp Tục Mua Sắm
            </Link>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.cartItems}>
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
                    placeholder="Tìm kiếm trong giỏ hàng..."
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

                <button className={styles.clearCartButton} onClick={clearCart}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Xóa Tất Cả
                </button>
              </div>

              {filteredCart.length === 0 ? (
                <div className={styles.noResults}>
                  <p>
                    Không tìm thấy sản phẩm nào với từ khóa &quot;{searchQuery}
                    &quot;
                  </p>
                </div>
              ) : (
                <div className={styles.itemsList}>
                  {filteredCart.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <Link
                        href={`/products/${item.id}`}
                        className={styles.itemImage}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Link>

                      <div className={styles.itemInfo}>
                        <div className={styles.itemHeader}>
                          <div>
                            <p className={styles.category}>{item.category}</p>
                            <Link href={`/products/${item.id}`}>
                              <h3 className={styles.name}>{item.name}</h3>
                            </Link>
                          </div>
                          <button
                            className={styles.removeButton}
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className={styles.itemFooter}>
                          <div className={styles.quantityControl}>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              min="1"
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>

                          <div className={styles.priceInfo}>
                            <span className={styles.price}>
                              {formatPrice(item.price)}
                            </span>
                            <span className={styles.subtotal}>
                              = {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Tổng Đơn Hàng</h2>

              <div className={styles.summaryDetails}>
                <div className={styles.summaryRow}>
                  <span>Tạm tính:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Phí vận chuyển:</span>
                  <span className={styles.free}>Miễn phí</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Giảm giá:</span>
                  <span className={styles.discount}>0đ</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Thanh Toán
              </button>

              <Link href="/products" className={styles.continueButton}>
                ← Tiếp Tục Mua Sắm
              </Link>

              <div className={styles.features}>
                <div className={styles.feature}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Thanh toán an toàn</span>
                </div>
                <div className={styles.feature}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  <span>Miễn phí vận chuyển</span>
                </div>
                <div className={styles.feature}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Đổi trả 30 ngày</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
