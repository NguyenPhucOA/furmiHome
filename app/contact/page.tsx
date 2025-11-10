"use client";

import React from "react";
import Link from "next/link";
import { useContact } from "./useContact";
import styles from "./contact.module.scss";
import MapSection from "./MapSection";

export default function ContactPage() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitMessage,
    contactInfo,
  } = useContact();
  return (
    <div className={styles.contact}>
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
            <span>Liên Hệ</span>
          </div>
          <h1 className={styles.title}>Liên Hệ Với Chúng Tôi</h1>
          <p className={styles.subtitle}>
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.infoSection}>
            <div className={styles.infoCards}>
              {contactInfo.map((info, index) => (
                <div key={index} className={styles.infoCard}>
                  <span className={styles.icon}>{info.icon}</span>
                  <h3 className={styles.cardTitle}>{info.title}</h3>
                  <div className={styles.cardContent}>
                    {info.link ? (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.content}
                      </a>
                    ) : (
                      info.content
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Gửi Tin Nhắn</h2>
            <p className={styles.formSubtitle}>
              Điền thông tin và chúng tôi sẽ phản hồi sớm nhất có thể
            </p>

            {submitMessage && (
              <div
                className={`${styles.message} ${styles[submitMessage.type]}`}
              >
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Họ và Tên *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Số Điện Thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="0901234567"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="example@email.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Tiêu Đề *</label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  placeholder="Tư vấn sản phẩm, báo giá, khiếu nại..."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Nội Dung *</label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className={styles["animate-spin"]}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
                    Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi Tin Nhắn
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className={styles.mapSection}>
          <h2 className={styles.mapTitle}>Vị Trí Showroom</h2>
          <div className={styles.mapContainer}>
            <MapSection />
          </div>
        </div>
      </div>
    </div>
  );
}
