"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Play, Shield, Award, Sparkle, CheckCircle2 } from "lucide-react";

interface WhyChooseUsProps {
  onOpenVideo: () => void;
  onOpenQuote: () => void;
}

export default function WhyChooseUs({ onOpenVideo, onOpenQuote }: WhyChooseUsProps) {
  return (
    <section
      id="why-us"
      style={{
        padding: "100px 0",
        backgroundColor: "var(--surface-cream)",
        color: "var(--text-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(199, 146, 62, 0.1) 0%, rgba(251, 249, 245, 0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="colorix-container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "54px",
            alignItems: "center",
          }}
          className="why-us-grid"
        >
          {/* Left Column: Video Preview Card */}
          <div
            style={{
              position: "relative",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              boxShadow: "0 20px 45px rgba(0, 0, 0, 0.12)",
              border: "1px solid rgba(15, 23, 42, 0.1)",
              height: "440px",
            }}
          >
            <Image
              src="/images/decorative.jpg"
              alt="Colorix master painter applying Venetian plaster finish"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />

            {/* Dark overlay for contrast */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(12, 20, 31, 0.25) 0%, rgba(12, 20, 31, 0.75) 100%)",
              }}
            />

            {/* Center Play Button */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <button
                onClick={onOpenVideo}
                className="animate-pulse-glow"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-gold)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 0 30px rgba(199, 146, 62, 0.5)",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                aria-label="Play showcase video"
              >
                <Play size={32} fill="#ffffff" style={{ marginLeft: "4px" }} />
              </button>

              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", display: "block" }}>
                  Watch the full video
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "#f3be6a",
                    fontWeight: 600,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "3px 10px",
                    borderRadius: "var(--radius-full)",
                    display: "inline-block",
                    marginTop: "4px",
                  }}
                >
                  1m 23s
                </span>
              </div>
            </div>

            {/* Bottom floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(12, 20, 31, 0.85)",
                backdropFilter: "blur(8px)",
                padding: "10px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <span style={{ fontSize: "0.82rem", color: "#e2e8f0" }}>
                Behind the scenes: Kensington Residence Transformation
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--accent-gold)", fontWeight: 700 }}>
                HD 4K
              </span>
            </div>
          </div>

          {/* Right Column: Copy & Value Proposition */}
          <div>
            <div className="section-badge" style={{ marginBottom: "16px" }}>
              <Sparkles size={14} color="var(--accent-gold)" />
              <span>Why Choose Us</span>
            </div>

            <h2
              className="section-title"
              style={{ color: "var(--text-dark)", marginBottom: "20px" }}
            >
              Your Trusted Partner for Professional Painting
            </h2>

            <p
              style={{
                fontSize: "1.08rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                marginBottom: "32px",
              }}
            >
              Choosing the right painting company makes all the difference in the final
              result. At Colorix, we combine skilled craftsmanship, premium materials,
              and a customer-first approach to give you results that inspire pride for
              years to come.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "36px" }}>
              {[
                {
                  title: "Meticulous Surface Care & Protection",
                  desc: "We mask every floor, trim, switch, and furniture piece before a single brush stroke begins.",
                },
                {
                  title: "Premium Grade British Paints",
                  desc: "Formulations engineered for durability, washable scrubbability, and rich depth of color.",
                },
                {
                  title: "Transparent, Guaranteed Pricing",
                  desc: "Itemized written estimates with zero surprise extras or post-job add-ons.",
                },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "var(--accent-gold-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-gold)",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-dark)", marginBottom: "3px" }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button onClick={onOpenQuote} className="btn-primary" style={{ padding: "14px 28px" }}>
                <span>Get Your Free Consultation</span>
              </button>
              <button
                onClick={onOpenVideo}
                className="btn-secondary"
                style={{
                  padding: "14px 24px",
                  backgroundColor: "#ffffff",
                  color: "var(--text-dark)",
                  border: "1px solid var(--border-light)",
                  boxShadow: "var(--shadow-sm)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--primary-navy)";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "var(--primary-navy)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.color = "var(--text-dark)";
                  e.currentTarget.style.borderColor = "var(--border-light)";
                }}
              >
                <Play size={15} />
                <span>Watch Story (1m 23s)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 960px) {
          .why-us-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
}
