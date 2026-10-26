"use client";

import React from "react";
import Image from "next/image";

interface CtaEmergencyProps {
  onOpenQuote?: () => void;
}

export default function CtaEmergency({ onOpenQuote }: CtaEmergencyProps) {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        backgroundColor: "#f7f5ed",
        overflow: "hidden",
        minHeight: "680px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background Painter Image on the Right */}
      <div
        className="emergency-image-bg"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "55%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Image
          src="/images/emergency_painter.jpg"
          alt="Professional painter rolling yellow paint on wall"
          fill
          sizes="(max-width: 900px) 100vw, 55vw"
          style={{
            objectFit: "cover",
            objectPosition: "center right",
          }}
          priority
        />
        {/* Soft gradient blend from left background into image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #f7f5ed 0%, rgba(247, 245, 237, 0.85) 15%, rgba(247, 245, 237, 0) 45%)",
          }}
        />
      </div>

      {/* Content Container on the Left */}
      <div
        className="colorix-container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "90px",
          paddingBottom: "90px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "560px" }}>
          {/* Eyebrow / 24/7 EMERGENCY */}
          <div
            style={{
              color: "#f55d28",
              fontSize: "0.95rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            24/ 7 EMERGENCY
          </div>

          {/* Main Headline */}
          <h2
            style={{
              fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
              fontWeight: 800,
              fontFamily: "var(--font-outfit)",
              lineHeight: 1.12,
              color: "#111827",
              letterSpacing: "-0.03em",
              marginBottom: "44px",
            }}
          >
            Ready To Transform <br />
            Your Space Color?
          </h2>

          {/* Easy Ways Group */}
          <div style={{ marginBottom: "26px" }}>
            <h3
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              Easy Ways
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "1.02rem",
                color: "#475569",
              }}
            >
              <div>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  Email Address:
                </span>{" "}
                <a
                  href="mailto:info@colorixpainting.co.uk"
                  style={{
                    color: "#475569",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f55d28")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  info@colorixpainting.co.uk
                </a>
              </div>

              <div>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  Phone Number:
                </span>{" "}
                <a
                  href="tel:+442012345678"
                  style={{
                    color: "#475569",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f55d28")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  +44 20 1234 5678
                </a>
              </div>
            </div>
          </div>

          {/* Thin Horizontal Divider */}
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              height: "1px",
              backgroundColor: "rgba(15, 23, 42, 0.12)",
              margin: "26px 0",
            }}
          />

          {/* Our Address Group */}
          <div>
            <h3
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "14px",
              }}
            >
              Our Address
            </h3>

            <p
              style={{
                fontSize: "1.02rem",
                color: "#475569",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              West London, United Kingdom <br />
              Victoria 3000, London
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .emergency-image-bg {
            position: relative !important;
            width: 100% !important;
            height: 380px !important;
          }
          section {
            display: flex !important;
            flex-direction: column-reverse !important;
          }
        }
      `}</style>
    </section>
  );
}
