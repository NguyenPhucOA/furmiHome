"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./about.module.scss";

export default function AboutPage() {
  const values = [
    {
      icon: "✨",
      title: "Chất Lượng",
      description:
        "Cam kết mang đến sản phẩm chất lượng cao nhất với giá cả hợp lý",
    },
    {
      icon: "🎨",
      title: "Sáng Tạo",
      description: "Thiết kế độc đáo, hiện đại phù hợp với xu hướng thế giới",
    },
    {
      icon: "💚",
      title: "Bền Vững",
      description:
        "Sử dụng vật liệu thân thiện môi trường, góp phần bảo vệ hành tinh",
    },
    {
      icon: "🤝",
      title: "Tận Tâm",
      description: "Đội ngũ chuyên nghiệp, hỗ trợ khách hàng nhiệt tình 24/7",
    },
  ];

  const team = [
    {
      name: "Nguyễn Văn A",
      position: "CEO & Founder",
      avatar: "👨‍💼",
      bio: "Với 20 năm kinh nghiệm trong ngành nội thất",
    },
    {
      name: "Trần Thị B",
      position: "Design Director",
      avatar: "👩‍🎨",
      bio: "Chuyên gia thiết kế nội thất quốc tế",
    },
    {
      name: "Lê Văn C",
      position: "Operations Manager",
      avatar: "👨‍💻",
      bio: "Quản lý vận hành hiệu quả và chuyên nghiệp",
    },
    {
      name: "Phạm Thị D",
      position: "Customer Success",
      avatar: "👩‍💼",
      bio: "Đảm bảo sự hài lòng tuyệt đối của khách hàng",
    },
  ];

  const stats = [
    { icon: "👥", value: "10,000+", label: "Khách Hàng Hài Lòng" },
    { icon: "🛋️", value: "5,000+", label: "Sản Phẩm" },
    { icon: "🏆", value: "50+", label: "Giải Thưởng" },
    { icon: "⭐", value: "15+", label: "Năm Kinh Nghiệm" },
  ];

  return (
    <div className={styles.about}>
      <section className={styles.hero}>
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
            <span>Về Chúng Tôi</span>
          </div>
          <h1 className={styles.title}>Về FurniHome</h1>
          <p className={styles.subtitle}>
            Tạo nên không gian sống hoàn hảo với những sản phẩm nội thất chất
            lượng cao, thiết kế hiện đại và dịch vụ tận tâm
          </p>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.imageContainer}>
              <Image
                src="https://sbshouse.vn/wp-content/uploads/2024/08/showroom-noi-that-da-nang-sbs-1-scaled.webp"
                alt="Câu chuyện FurniHome"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={styles.textContent}>
              <p className={styles.sectionLabel}>Câu Chuyện Của Chúng Tôi</p>
              <h2 className={styles.sectionTitle}>
                Hành Trình 15 Năm Kiến Tạo Không Gian Sống
              </h2>
              <p className={styles.text}>
                Thành lập vào năm 2010, FurniHome bắt đầu từ một cửa hàng nhỏ
                với ước mơ mang đến những sản phẩm nội thất chất lượng cao cho
                mọi gia đình Việt Nam.
              </p>
              <p className={styles.text}>
                Qua 15 năm phát triển, chúng tôi đã trở thành một trong những
                thương hiệu nội thất uy tín hàng đầu với hơn 10,000 khách hàng
                hài lòng và 50+ giải thưởng trong ngành.
              </p>
              <p className={styles.text}>
                Sứ mệnh của chúng tôi không chỉ là bán nội thất, mà là tạo ra
                những không gian sống ý nghĩa, nơi mỗi gia đình có thể tạo nên
                những kỷ niệm đáng nhớ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.sectionLabel}>Giá Trị Cốt Lõi</p>
            <h2 className={styles.sectionTitle}>
              Những Điều Chúng Tôi Tin Tưởng
            </h2>
          </div>

          <div className={styles.grid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <span className={styles.icon}>{value.icon}</span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.sectionLabel}>Đội Ngũ</p>
            <h2 className={styles.sectionTitle}>Gặp Gỡ Đội Ngũ Chúng Tôi</h2>
          </div>

          <div className={styles.grid}>
            {team.map((member, index) => (
              <div key={index} className={styles.memberCard}>
                <div className={styles.avatar}>{member.avatar}</div>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.position}>{member.position}</p>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <span className={styles.icon}>{stat.icon}</span>
                <span className={styles.value}>{stat.value}</span>
                <p className={styles.label}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
