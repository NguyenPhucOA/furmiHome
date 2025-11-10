"use client";

import React from "react";
import Image from "next/image";
import { useAbout } from "./useAbout";
import styles from "./About.module.scss";

export const About: React.FC = () => {
  const { features, stats, activeFeature, setActiveFeature } = useAbout();

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={styles.subtitle}>Về Chúng Tôi</p>
            <h2 className={styles.title}>
              Tạo Nên Không Gian Sống Hoàn Hảo Của Bạn
            </h2>
            <p className={styles.description}>
              Với hơn 15 năm kinh nghiệm trong ngành nội thất, chúng tôi tự hào
              mang đến những sản phẩm chất lượng cao cùng dịch vụ tận tâm. Mỗi
              sản phẩm được chọn lọc kỹ lưỡng để đảm bảo sự hoàn hảo cho không
              gian của bạn.
            </p>
            <button className={styles.button}>
              Tìm Hiểu Thêm
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          <div className={styles.imageContent}>
            <Image
              src="https://sbshouse.vn/wp-content/uploads/2024/08/showroom-noi-that-da-nang-sbs-1-scaled.webp"
              alt="Showroom nội thất"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`${styles.featureCard} ${
                activeFeature === index ? styles.active : ""
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <span className={styles.statValue}>{stat.value}</span>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
