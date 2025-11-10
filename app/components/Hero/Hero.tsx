"use client";

import React from "react";
import { useHero } from "./useHero";
import styles from "./Hero.module.scss";

export const Hero: React.FC = () => {
  const { slides, currentSlide, goToSlide, nextSlide, prevSlide } = useHero();

  return (
    <section className={styles.hero}>
      <div className={styles.slideContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <div
              className={styles.slideBackground}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className={styles.content}>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.description}>{slide.description}</p>
              <button className={styles.button}>{slide.buttonText}</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.arrows}>
        <button
          className={styles.arrow}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className={styles.arrow}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className={styles.navigation}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.navDot} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
