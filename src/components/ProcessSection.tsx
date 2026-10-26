"use client";

import React from "react";
import { SITE_DATA } from "@/data/content";
import {
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  Paintbrush,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function ProcessSection() {
  const iconMap: Record<string, any> = {
    CalendarCheck: CalendarCheck,
    ShieldCheck: ShieldCheck,
    Paintbrush: Paintbrush,
    CheckCircle: CheckCircle,
  };

  return (
    <section
      id="process"
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
            <span>How We Work</span>
          </div>
          <h2 className="section-title">A Simple, Professional Painting Process</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            We’ve refined our four-step execution to deliver stress-free, museum-grade
            finishes from initial concept to the final walk-through.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "28px",
            position: "relative",
          }}
        >
          {SITE_DATA.processSteps.map((step, index) => {
            const IconComp = iconMap[step.icon] || Paintbrush;
            return (
              <div
                key={step.number}
                style={{
                  backgroundColor: "var(--surface-cream)",
                  borderRadius: "var(--radius-lg)",
                  padding: "36px 26px",
                  border: "1px solid rgba(15, 23, 42, 0.07)",
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
                  e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.07)";
                  e.currentTarget.style.backgroundColor = "var(--surface-cream)";
                }}
              >
                {/* Number & Icon Row */}
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
                      fontSize: "2.2rem",
                      fontWeight: 800,
                      fontFamily: "var(--font-outfit)",
                      color: "var(--accent-gold)",
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </span>

                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(12, 20, 31, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary-navy)",
                    }}
                  >
                    <IconComp size={22} />
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
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
