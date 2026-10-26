"use client";

import React from "react";
import { SITE_DATA } from "@/data/content";
import { Sparkles, Shield, TrendingUp, Sparkle, Smile, PhoneCall } from "lucide-react";

export default function BenefitsSection() {
  const benefitIcons = [Sparkle, TrendingUp, Shield, Smile, PhoneCall];

  return (
    <section
      id="benefits"
      style={{
        padding: "100px 0",
        backgroundColor: "var(--surface-white)",
        position: "relative",
      }}
    >
      <div className="colorix-container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 60px auto" }}>
          <div className="section-badge" style={{ margin: "0 auto 16px auto" }}>
            <Sparkles size={14} color="var(--accent-gold)" />
            <span>Why We Excel</span>
          </div>
          <h2 className="section-title">The Benefits of Choosing Colorix</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Discover why residential and commercial property owners throughout West
            London partner with us for exceptional results.
          </p>
        </div>

        {/* Benefits Grid (5 items) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {SITE_DATA.benefits.map((benefit, idx) => {
            const IconComp = benefitIcons[idx % benefitIcons.length];
            return (
              <div
                key={benefit.number}
                style={{
                  backgroundColor: "var(--surface-cream)",
                  borderRadius: "var(--radius-lg)",
                  padding: "36px 28px",
                  border: "1px solid rgba(15, 23, 42, 0.06)",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  e.currentTarget.style.borderColor = "var(--border-gold)";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.06)";
                  e.currentTarget.style.backgroundColor = "var(--surface-cream)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "2.4rem",
                      fontWeight: 800,
                      fontFamily: "var(--font-outfit)",
                      color: "var(--accent-gold)",
                      lineHeight: 1,
                    }}
                  >
                    {benefit.number}
                  </span>

                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(12, 20, 31, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary-navy)",
                    }}
                  >
                    <IconComp size={20} />
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--text-dark)",
                    marginBottom: "12px",
                  }}
                >
                  {benefit.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.65,
                    color: "var(--text-secondary)",
                  }}
                >
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
