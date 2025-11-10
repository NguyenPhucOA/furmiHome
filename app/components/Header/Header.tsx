"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useHeader } from "./useHeader";
import { useShop } from "@/app/context/ShopContext";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import logo from "@/app/images/logo.jpg";
export const Header: React.FC = () => {
  const {
    isScrolled,
    isMobileMenuOpen,
    toggleMobileMenu,
    navLinks,
    isHomePage,
  } = useHeader();
  const router = useRouter();
  const { favorites, getTotalItems } = useShop();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${
          isScrolled || !isHomePage ? styles.scrolled : ""
        }`}
      >
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span>
              <img src={logo.src} width={80} height={80} />
            </span>
            FurniHome
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button className={styles.iconButton} aria-label="Search">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              href="/favorites"
              className={styles.iconButton}
              aria-label="Wishlist"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>

              {mounted && favorites.length > 0 && (
                <span className={styles.cartBadge}>{favorites.length}</span>
              )}
            </Link>
            <Link href="/cart" className={styles.iconButton} aria-label="Cart">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              {mounted && getTotalItems() > 0 && (
                <span className={styles.cartBadge}>{getTotalItems()}</span>
              )}
            </Link>
            <button
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link
              href="/user"
              className={styles.iconButton}
              aria-label="Tài khoản"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <div
        className={`${styles.overlay} ${
          isMobileMenuOpen ? styles.visible : ""
        }`}
        onClick={toggleMobileMenu}
      />

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.logo}>
            <span>🏠</span>
            FurniHome
          </Link>
          <button
            className={styles.mobileMenuClose}
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={toggleMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
