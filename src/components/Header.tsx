"use client";

import React, { useState } from "react";
import { SITE_DATA } from "@/data/content";
import {
  Mail,
  Phone,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

interface HeaderProps {
  onOpenQuote: () => void;
}

export default function Header({ onOpenQuote }: HeaderProps) {
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ width: "100%", position: "relative", zIndex: 100 }}>
      {/* Top Banner Ribbon */}
      <div
        style={{
          backgroundColor: "#ebe7de",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          padding: "7px 0",
          fontSize: "0.82rem",
          color: "#272e3b",
        }}
      >
        <div
          className="colorix-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Left Announcement */}
          <div style={{ fontWeight: 500, color: "#222938" }}>
            Let’s bring new color to your space — Get a free painting quote today!
          </div>

          {/* Right Contacts & Socials */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Email */}
            <a
              href={`mailto:${SITE_DATA.emailPrimary}`}
              className="topbar-interactive-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                color: "#222938",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <Mail size={15} color="#222938" />
              <span>{SITE_DATA.emailPrimary}</span>
            </a>

            {/* Divider */}
            <div style={{ width: "1px", height: "14px", backgroundColor: "#c5beaf" }} />

            {/* Phone */}
            <a
              href={`tel:${SITE_DATA.phonePrimary}`}
              className="topbar-interactive-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                color: "#222938",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <Phone size={15} color="#222938" />
              <span>{SITE_DATA.phonePrimary}</span>
            </a>

            {/* Social Media Icons with Smooth Hover Lift */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "6px" }}>
              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-hover-icon"
                aria-label="X Twitter"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-hover-icon"
                aria-label="Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-hover-icon"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-hover-icon"
                aria-label="LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        style={{
          backgroundColor: "#f7f5ed",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          padding: "16px 0",
        }}
      >
        <div
          className="colorix-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo with subtle hover micro-interaction */}
          <a
            href="#"
            className="brand-logo-link"
          >
            {/* Flame/Wave icon */}
            <svg width="42" height="34" viewBox="0 0 46 38" fill="none">
              <path
                d="M4.5 28C2 22 4 15 9 10C14 5 21 4 28 8C20 10 16 16 18 22C19 25 22 28 26 28C20 33 11 34 4.5 28Z"
                fill="#f55d28"
              />
              <path
                d="M12 18C15 12 21 8 28 8C33 8 38 11 41 16C34 16 30 20 31 25C32 27 34 29 37 30C30 34 22 33 16 28C13 25 11 22 12 18Z"
                fill="#ffa012"
              />
              <path
                d="M20 22C23 18 28 15 34 16C37 16 41 19 43 23C38 23 35 26 36 29C32 32 26 32 22 28C20.5 26.5 19.5 24.5 20 22Z"
                fill="#e62060"
                opacity="0.85"
              />
            </svg>

            <span
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#161d2a",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Colorix
            </span>
          </a>

          {/* Desktop Menu Links with Smooth Hover & Position Movement */}
          <div
            className="desktop-nav-menu"
            style={{
              display: "none",
              alignItems: "center",
              gap: "34px",
            }}
          >
            {/* Pages dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                onBlur={() => setTimeout(() => setPagesDropdownOpen(false), 200)}
                className="menu-nav-link menu-dropdown-btn"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span>Pages</span>
                <ChevronDown
                  size={15}
                  style={{
                    transition: "transform 0.25s ease",
                    transform: pagesDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {pagesDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    marginTop: "10px",
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    boxShadow: "0 14px 35px rgba(0,0,0,0.12)",
                    padding: "8px",
                    width: "190px",
                    zIndex: 50,
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    animation: "dropdownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <a href="#about" className="dropdown-menu-item">
                    About Us
                  </a>
                  <a href="#process" className="dropdown-menu-item">
                    Our Process
                  </a>
                  <a href="#testimonials" className="dropdown-menu-item">
                    Testimonials
                  </a>
                </div>
              )}
            </div>

            {/* Services */}
            <a href="#services" className="menu-nav-link">
              Services
            </a>

            {/* Projects */}
            <a href="#projects" className="menu-nav-link">
              Projects
            </a>

            {/* Contact */}
            <a href="#contact" className="menu-nav-link">
              Contact
            </a>
          </div>

          {/* Right: CTA button with Smooth Elevating Hover */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              onClick={onOpenQuote}
              className="header-cta-button"
            >
              Get a Free Quote
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#1c2331",
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "#f7f5ed",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "1rem", fontWeight: 600, color: "#1c2331", textDecoration: "none" }}
          >
            About Us
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "1rem", fontWeight: 600, color: "#1c2331", textDecoration: "none" }}
          >
            Services
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "1rem", fontWeight: 600, color: "#1c2331", textDecoration: "none" }}
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "1rem", fontWeight: 600, color: "#1c2331", textDecoration: "none" }}
          >
            Contact
          </a>
        </div>
      )}

      {/* Embedded CSS for smooth hover movement and effects */}
      <style jsx>{`
        /* Smooth hover movement for menu links */
        .menu-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.98rem;
          font-weight: 500;
          color: #1c2331;
          text-decoration: none;
          position: relative;
          padding: 6px 2px;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.22s ease,
                      letter-spacing 0.2s ease;
          will-change: transform;
        }

        .menu-nav-link:hover {
          color: #f55d28 !important;
          transform: translateY(-3px) scale(1.03);
        }

        /* Subtle indicator under menu option on hover */
        .menu-nav-link::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 75%;
          height: 2.5px;
          background-color: #f55d28;
          border-radius: 9999px;
          transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .menu-nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        /* Dropdown options smooth shift */
        .dropdown-menu-item {
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 0.92rem;
          font-weight: 500;
          color: #2b3445;
          text-decoration: none;
          display: block;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      color 0.2s ease;
          will-change: transform;
        }

        .dropdown-menu-item:hover {
          background-color: #fef3ee;
          color: #f55d28;
          transform: translateX(5px);
        }

        /* Brand logo smooth lift */
        .brand-logo-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .brand-logo-link:hover {
          transform: translateY(-2px);
        }

        /* Main CTA button hover lift */
        .header-cta-button {
          background-color: #f55d28;
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          padding: 13px 26px;
          font-size: 0.98rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(245, 93, 40, 0.3);
          transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      box-shadow 0.26s ease;
          will-change: transform;
        }

        .header-cta-button:hover {
          background-color: #e04e1c;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 24px rgba(245, 93, 40, 0.42);
        }

        /* Topbar contact links hover */
        .topbar-interactive-link {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
          will-change: transform;
        }

        .topbar-interactive-link:hover {
          color: #f55d28 !important;
          transform: translateY(-1.5px);
        }

        /* Social icons hover lift */
        .social-hover-icon {
          color: #222938;
          display: flex;
          align-items: center;
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
          will-change: transform;
        }

        .social-hover-icon:hover {
          color: #f55d28;
          transform: translateY(-2.5px) scale(1.15);
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 860px) {
          .desktop-nav-menu {
            display: flex !important;
          }
        }
        @media (max-width: 859px) {
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
