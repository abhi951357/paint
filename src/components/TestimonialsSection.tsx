"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE_DATA, TestimonialItem } from "@/data/content";
import { Sparkles, Star, ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialsSection() {
  // Start with index 1 (Emma Richardson) in the center, matching reference design
  const [activeIndex, setActiveIndex] = useState(1);

  const total = SITE_DATA.testimonials.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const avatarMap: Record<string, string> = {
    "1": "/images/customer_2.jpg",
    "2": "/images/customer_1.jpg",
    "3": "/images/customer_3.jpg",
  };

  return (
    <section
      id="testimonials"
      style={{
        padding: "100px 0 90px 0",
        backgroundColor: "var(--surface-cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="colorix-container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 50px auto" }}>
          <div className="section-badge" style={{ margin: "0 auto 16px auto" }}>
            <Sparkles size={14} color="var(--accent-gold)" />
            <span>Client Feedback</span>
          </div>
          <h2 className="section-title">What Our Clients Say About Colorix</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Read genuine reviews from London homeowners, estate managers, and
            business owners who trusted Colorix with their spaces.
          </p>
        </div>

        {/* 3D Curved Testimonials Stage */}
        <div className="curved-testimonials-stage">
          {SITE_DATA.testimonials.map((t: TestimonialItem, idx: number) => {
            let diff = (idx - activeIndex) % total;
            if (diff < -1) diff += total;
            if (diff > 1) diff -= total;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;

            let cardClassName = "curved-card";
            if (isCenter) cardClassName += " curved-card-center";
            else if (isLeft) cardClassName += " curved-card-left";
            else if (isRight) cardClassName += " curved-card-right";
            else cardClassName += " curved-card-hidden";

            return (
              <div
                key={t.id}
                className={cardClassName}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                }}
              >
                {/* 5 Orange Stars */}
                <div style={{ display: "flex", gap: "4px", marginBottom: "22px" }}>
                  {[...Array(t.rating || 5)].map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      size={20}
                      fill="#f55d28"
                      color="#f55d28"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p
                  className="curved-card-quote"
                  style={{
                    color: isCenter ? "#ffffff" : "#1c2331",
                  }}
                >
                  “{t.quote}”
                </p>

                {/* Bottom Client Profile & Subtle Divider */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "20px",
                    borderTop: isCenter
                      ? "1px solid rgba(255, 255, 255, 0.12)"
                      : "1px solid rgba(15, 23, 42, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      backgroundColor: isCenter ? "#28253b" : "#eae6dc",
                      border: isCenter ? "2px solid rgba(255,255,255,0.2)" : "2px solid #ffffff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Image
                      src={avatarMap[t.id] || "/images/customer_1.jpg"}
                      alt={t.name}
                      fill
                      sizes="48px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div>
                    <h4
                      style={{
                        fontSize: "1.02rem",
                        fontWeight: 700,
                        color: isCenter ? "#ffffff" : "#1c2331",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {t.name}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.84rem",
                        fontWeight: 500,
                        color: isCenter ? "#9da4b0" : "#64748b",
                        display: "block",
                        marginTop: "2px",
                      }}
                    >
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation: Circular Arrows + Progress Pill */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            marginTop: "30px",
          }}
        >
          {/* Arrow Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1.5px solid #1c2331",
                backgroundColor: "#ffffff",
                color: "#1c2331",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#181628";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "#181628";
                e.currentTarget.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#1c2331";
                e.currentTarget.style.borderColor = "#1c2331";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ArrowLeft size={19} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1.5px solid #1c2331",
                backgroundColor: "#ffffff",
                color: "#1c2331",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#181628";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "#181628";
                e.currentTarget.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#1c2331";
                e.currentTarget.style.borderColor = "#1c2331";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ArrowRight size={19} />
            </button>
          </div>

          {/* Progress Indicator Pill */}
          <div
            style={{
              width: "44px",
              height: "5px",
              borderRadius: "9999px",
              backgroundColor: "#181628",
              opacity: 0.55,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .curved-testimonials-stage {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 520px;
          margin: 0 auto;
          overflow: visible;
        }

        .curved-card {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 390px;
          height: 440px;
          border-radius: 26px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.45s ease,
            background-color 0.45s ease,
            opacity 0.45s ease;
          user-select: none;
        }

        .curved-card-center {
          transform: translate(-50%, -50%) translateY(-10px) rotate(0deg) scale(1);
          z-index: 10;
          background-color: #181628;
          box-shadow: 0 32px 70px rgba(24, 22, 40, 0.32);
          border: 1px solid rgba(255, 255, 255, 0.08);
          opacity: 1;
        }

        .curved-card-left {
          transform: translate(calc(-50% - 370px), calc(-50% + 36px)) rotate(-11deg) scale(0.92);
          z-index: 4;
          background-color: #ffffff;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(15, 23, 42, 0.08);
          opacity: 0.96;
        }

        .curved-card-right {
          transform: translate(calc(-50% + 370px), calc(-50% + 36px)) rotate(11deg) scale(0.92);
          z-index: 4;
          background-color: #ffffff;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(15, 23, 42, 0.08);
          opacity: 0.96;
        }

        .curved-card-hidden {
          transform: translate(-50%, -50%) scale(0.7);
          z-index: 0;
          opacity: 0;
          pointer-events: none;
        }

        .curved-card-quote {
          font-size: 1.12rem;
          line-height: 1.65;
          font-weight: 500;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        @media (max-width: 960px) {
          .curved-testimonials-stage {
            height: 480px;
          }
          .curved-card {
            width: 340px;
            height: 420px;
            padding: 30px 24px;
          }
          .curved-card-left {
            transform: translate(calc(-50% - 260px), calc(-50% + 30px)) rotate(-9deg) scale(0.86);
            opacity: 0.75;
          }
          .curved-card-right {
            transform: translate(calc(-50% + 260px), calc(-50% + 30px)) rotate(9deg) scale(0.86);
            opacity: 0.75;
          }
        }

        @media (max-width: 640px) {
          .curved-testimonials-stage {
            height: 440px;
          }
          .curved-card {
            width: min(320px, 86vw);
            height: 400px;
            padding: 26px 20px;
          }
          .curved-card-quote {
            font-size: 1rem;
            line-height: 1.55;
          }
          .curved-card-left {
            transform: translate(calc(-50% - 150px), calc(-50% + 24px)) rotate(-7deg) scale(0.78);
            opacity: 0.35;
          }
          .curved-card-right {
            transform: translate(calc(-50% + 150px), calc(-50% + 24px)) rotate(7deg) scale(0.78);
            opacity: 0.35;
          }
        }
      `}</style>
    </section>
  );
}
