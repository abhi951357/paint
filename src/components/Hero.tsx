"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface HeroProps {
  onOpenQuote: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  const [activeThumb, setActiveThumb] = useState(1);

  const thumbnails = [
    { id: 0, src: "/images/thumb_1.jpg", alt: "Professional painter in workshop" },
    { id: 1, src: "/images/painter_hero.jpg", alt: "Female painter with roller" },
    { id: 2, src: "/images/thumb_3.jpg", alt: "Exterior painting on ladder" },
  ];

  const mainImages = [
    "/images/thumb_1.jpg",
    "/images/painter_hero.jpg",
    "/images/thumb_3.jpg",
  ];

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        backgroundColor: "#f7f5ed",
        paddingTop: "40px",
        paddingBottom: "40px",
        overflow: "hidden",
        minHeight: "680px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Soft warm painted watercolor brush backdrop on left */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "25%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.16) 0%, rgba(247, 245, 237, 0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div className="colorix-container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "36px",
            alignItems: "center",
          }}
          className="hero-reference-grid"
        >
          {/* Left Column: Headline, Subtitle, Buttons, Reviews */}
          <div style={{ maxWidth: "610px", zIndex: 3 }}>
            {/* Main Headline */}
            <h1
              style={{
                fontSize: "clamp(2.8rem, 5.6vw, 4.4rem)",
                lineHeight: 1.04,
                fontWeight: 800,
                color: "#141a27",
                letterSpacing: "-0.035em",
                fontFamily: "var(--font-outfit)",
                marginBottom: "22px",
              }}
            >
              Professional <br />
              Painting Services <br />
              in West London
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "1.08rem",
                lineHeight: 1.6,
                color: "#475263",
                marginBottom: "34px",
                maxWidth: "540px",
                fontWeight: 400,
              }}
            >
              Colorix provides expert interior and exterior painting for homes and
              businesses across West London, delivering smooth finishes.
            </p>

            {/* Dual Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "38px",
                flexWrap: "wrap",
              }}
            >
              {/* Primary Orange Button */}
              <button
                onClick={onOpenQuote}
                style={{
                  backgroundColor: "#f55d28",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "16px 36px",
                  fontSize: "1.02rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(245, 93, 40, 0.32)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e04e1c";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f55d28";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get a Free Quote
              </button>

              {/* Secondary White Button */}
              <a
                href="#about"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#161d2a",
                  border: "1px solid #d9d3c5",
                  borderRadius: "9999px",
                  padding: "16px 34px",
                  fontSize: "1.02rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#b5ac9a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#d9d3c5";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Learn More
              </a>
            </div>

            {/* Social Proof: Avatars + Stars + Text */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              {/* Overlapping Avatars with Customer Photos */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {[
                  { src: "/images/customer_1.jpg", alt: "Customer review" },
                  { src: "/images/customer_2.jpg", alt: "Customer review" },
                  { src: "/images/customer_3.jpg", alt: "Customer review" },
                ].map((customer, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2.5px solid #ffffff",
                      marginLeft: idx === 0 ? 0 : "-12px",
                      backgroundColor: "#e8e5dc",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={customer.src}
                      alt={customer.alt}
                      fill
                      sizes="48px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>

              {/* Stars & Text */}
              <div>
                <div style={{ display: "flex", gap: "3px", marginBottom: "4px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="#f55d28"
                      color="#f55d28"
                    />
                  ))}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  Trusted by 25K+ Customers
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Painter Portrait with Floating Thumbnails */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              minHeight: "560px",
            }}
          >
            {/* Main Painter Portrait */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "580px",
                height: "560px",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
                backgroundColor: "#efece3",
              }}
            >
              <Image
                src={mainImages[activeThumb]}
                alt="Professional painter delivering smooth finish in West London"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "top center",
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* Floating 3 Thumbnails in Bottom Right corner */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  display: "flex",
                  gap: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.45)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  padding: "8px",
                  borderRadius: "14px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                  zIndex: 10,
                }}
              >
                {thumbnails.map((t, index) => {
                  const isActive = activeThumb === index;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveThumb(index)}
                      style={{
                        position: "relative",
                        width: "68px",
                        height: "52px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: isActive ? "2.5px solid #f55d28" : "1.5px solid rgba(255, 255, 255, 0.8)",
                        padding: 0,
                        cursor: "pointer",
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                        transition: "all 0.2s ease",
                        boxShadow: isActive ? "0 4px 12px rgba(245, 93, 40, 0.35)" : "none",
                        backgroundColor: "#dfdbce",
                      }}
                      aria-label={t.alt}
                    >
                      <Image
                        src={t.src}
                        alt={t.alt}
                        fill
                        sizes="70px"
                        style={{ objectFit: "cover" }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 960px) {
          .hero-reference-grid {
            grid-template-columns: 1.15fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
