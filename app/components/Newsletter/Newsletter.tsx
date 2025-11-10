"use client";

import React from "react";
import { useNewsletter } from "./useNewsletter";
import styles from "./Newsletter.module.scss";

export const Newsletter: React.FC = () => {
  const { email, setEmail, isSubmitting, message, handleSubmit } =
    useNewsletter();

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <span className={styles.icon}>📬</span>
        <h2 className={styles.title}>Đăng Ký Nhận Ưu Đãi</h2>
        <p className={styles.description}>
          Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và xu hướng nội
          thất mới nhất
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              className={styles.input}
              placeholder="Nhập email của bạn..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang xử lý...
              </>
            ) : (
              <>
                Đăng Ký
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <div className={styles.features}>
          <div className={styles.feature}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Ưu đãi độc quyền</span>
          </div>
          <div className={styles.feature}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Thông tin mới nhất</span>
          </div>
          <div className={styles.feature}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Dễ dàng hủy đăng ký</span>
          </div>
        </div>
      </div>
    </section>
  );
};
