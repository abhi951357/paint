"use client";

import React from "react";
import Link from "next/link";
import { SITE_DATA } from "@/data/content";
import {
  Paintbrush,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ShieldCheck,
  Clock,
  Heart,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "#070c14",
        color: "#ffffff",
        paddingTop: "80px",
        paddingBottom: "36px",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="colorix-container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "48px",
            marginBottom: "60px",
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(199, 146, 62, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-gold)",
                  border: "1px solid rgba(199, 146, 62, 0.4)",
                }}
              >
                <Paintbrush size={20} />
              </div>
              <span
                style={{
                  fontSize: "1.45rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-outfit)",
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                COLORIX<span style={{ color: "var(--accent-gold)" }}>.</span>
              </span>
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--text-light-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              Colorix provides expert residential and commercial painting services
              across West London, delivering smooth finishes and enduring craftsmanship.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f3be6a", fontSize: "0.82rem" }}>
              <ShieldCheck size={16} />
              <span>Dulux & Farrow & Ball Certified Decorators</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Home", href: "#" },
                { name: "About Us", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Projects", href: "#projects" },
                { name: "How We Work", href: "#process" },
                { name: "Client Testimonials", href: "#testimonials" },
                { name: "Contact & Emergency", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-light-muted)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-light-muted)")}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Our Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Waterproof Coating", href: "#services" },
                { name: "Wood Painting & Polish", href: "#services" },
                { name: "Decorative Wall Design", href: "#services" },
                { name: "Crack & Gap Filling", href: "#services" },
              ].map((serv) => (
                <li key={serv.name}>
                  <a
                    href={serv.href}
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-light-muted)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-light-muted)")}
                  >
                    {serv.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              West London Hub
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <a
                href="https://www.google.com/maps/search/West+London,+United+Kingdom++Victoria+3000,+London/@51.5000094,-0.1440679,15z"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  color: "var(--text-light-muted)",
                  fontSize: "0.88rem",
                  lineHeight: 1.5,
                }}
              >
                <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>West London, United Kingdom Victoria 3000, London</span>
              </a>

              <a
                href={`tel:${SITE_DATA.phoneLondon}`}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  color: "var(--text-light-muted)",
                  fontSize: "0.88rem",
                }}
              >
                <Phone size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>+44 20 1234 5678 / (555) 123-4567</span>
              </a>

              <a
                href={`mailto:${SITE_DATA.emailSecondary}`}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  color: "var(--text-light-muted)",
                  fontSize: "0.88rem",
                }}
              >
                <Mail size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>info@colorixpainting.co.uk</span>
              </a>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  color: "var(--text-light-muted)",
                  fontSize: "0.85rem",
                  marginTop: "6px",
                }}
              >
                <Clock size={16} color="#f3be6a" />
                <span>Operating 24/7 for London emergencies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "30px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.82rem",
            color: "var(--text-light-muted)",
          }}
        >
          <div>
            © 2026 Colorix Painting Services. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Health & Safety</span>
            <Link
              href="/admin"
              style={{
                color: "var(--accent-gold)",
                textDecoration: "none",
                fontWeight: 600,
                opacity: 0.85,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
            >
              Admin Portal
            </Link>

            <button
              onClick={scrollToTop}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
