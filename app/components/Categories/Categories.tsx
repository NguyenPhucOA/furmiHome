"use client";

import React from "react";
import Image from "next/image";
import { useCategories } from "./useCategories";
import styles from "./Categories.module.scss";

export const Categories: React.FC = () => {
  const { categories, setHoveredCategory } = useCategories();

  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subtitle}>Danh Mục</p>
          <h2 className={styles.title}>Khám Phá Theo Phòng</h2>
          <p className={styles.description}>
            Tìm kiếm nội thất hoàn hảo cho từng không gian trong ngôi nhà của
            bạn
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className={styles.categoryImage}
                style={{ objectFit: "cover" }}
              />
              <div className={styles.overlay}>
                <div className={styles.categoryContent}>
                  <span className={styles.icon}>{category.icon}</span>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <div className={styles.productCount}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span>{category.productCount} sản phẩm</span>
                  </div>
                  <div className={styles.arrow}>
                    Khám Phá
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
