"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Calculator,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Coins,
  Clock,
  PaintBucket,
} from "lucide-react";

interface CostCalculatorProps {
  onQuoteReady: (estimateDetails: {
    roomType: string;
    scope: string;
    area: number;
    grade: string;
    estimatedMin: number;
    estimatedMax: number;
  }) => void;
}

export default function CostCalculator({ onQuoteReady }: CostCalculatorProps) {
  const [roomType, setRoomType] = useState("Living Room");
  const [scope, setScope] = useState("Walls + Ceilings");
  const [areaSqFt, setAreaSqFt] = useState(350);
  const [paintGrade, setPaintGrade] = useState("Designer Matte");

  // Calculate real-time estimated pricing
  const baseRatePerSqFt: Record<string, number> = {
    "Single Bedroom": 1.4,
    "Living Room": 1.6,
    "Full Apartment / Flat": 1.5,
    "Townhouse (Multi-Floor)": 1.8,
    "Exterior Facade": 2.2,
    "Commercial Space": 1.7,
  };

  const scopeMultiplier: Record<string, number> = {
    "Walls Only": 1.0,
    "Walls + Ceilings": 1.35,
    "Walls + Ceilings + Woodwork": 1.75,
    "Complete Restoration & Waterproofing": 2.1,
  };

  const gradeMultiplier: Record<string, number> = {
    "Standard Trade (Clean Vinyl Matt)": 1.0,
    "Designer Matte (Farrow & Ball / Little Greene)": 1.3,
    "Artisan Texture (Limewash / Venetian)": 1.65,
  };

  const rate =
    (baseRatePerSqFt[roomType] || 1.5) *
    (scopeMultiplier[scope] || 1.3) *
    (gradeMultiplier[paintGrade] || 1.2);

  const estimatedMin = Math.round(areaSqFt * rate * 0.9);
  const estimatedMax = Math.round(areaSqFt * rate * 1.15);

  const estimatedDays =
    areaSqFt < 300 ? "1 - 2 Days" : areaSqFt < 800 ? "2 - 3 Days" : areaSqFt < 1800 ? "4 - 6 Days" : "1 - 2 Weeks";

  const paintLitres = Math.ceil((areaSqFt * 2) / 120);

  const handleLockInQuote = () => {
    // Fire celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#c7923e", "#106669", "#b85d43", "#f3be6a"],
    });

    onQuoteReady({
      roomType,
      scope,
      area: areaSqFt,
      grade: paintGrade,
      estimatedMin,
      estimatedMax,
    });
  };

  return (
    <section
      id="calculator"
      style={{
        padding: "100px 0",
        backgroundColor: "var(--surface-cream)",
        position: "relative",
      }}
    >
      <div className="colorix-container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 50px auto" }}>
          <div className="section-badge" style={{ margin: "0 auto 16px auto" }}>
            <Calculator size={14} color="var(--accent-gold)" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="section-title">Instant Painting Cost Estimator</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Get an instant, transparent estimate for your West London project. No
            surprises, no hidden charges.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(24px, 4vw, 48px)",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
          }}
          className="calculator-grid"
        >
          {/* Controls Column */}
          <div>
            {/* Step 1: Room / Project Type */}
            <div style={{ marginBottom: "28px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--text-dark)",
                  marginBottom: "12px",
                }}
              >
                1. Select Property or Space Type
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "10px",
                }}
              >
                {[
                  "Living Room",
                  "Single Bedroom",
                  "Full Apartment / Flat",
                  "Townhouse (Multi-Floor)",
                  "Exterior Facade",
                  "Commercial Space",
                ].map((type) => {
                  const isSelected = roomType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setRoomType(type)}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        fontWeight: isSelected ? 700 : 500,
                        backgroundColor: isSelected ? "var(--primary-navy)" : "var(--surface-cream)",
                        color: isSelected ? "#ffffff" : "var(--text-dark)",
                        border: isSelected ? "1px solid var(--primary-navy)" : "1px solid rgba(0,0,0,0.06)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "center",
                      }}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scope of Work */}
            <div style={{ marginBottom: "28px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--text-dark)",
                  marginBottom: "12px",
                }}
              >
                2. Scope of Painting
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "10px",
                }}
              >
                {[
                  "Walls Only",
                  "Walls + Ceilings",
                  "Walls + Ceilings + Woodwork",
                  "Complete Restoration & Waterproofing",
                ].map((s) => {
                  const isSelected = scope === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setScope(s)}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        fontWeight: isSelected ? 700 : 500,
                        backgroundColor: isSelected ? "var(--accent-teal)" : "var(--surface-cream)",
                        color: isSelected ? "#ffffff" : "var(--text-dark)",
                        border: isSelected ? "1px solid var(--accent-teal)" : "1px solid rgba(0,0,0,0.06)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: isSelected ? "#ffffff" : "var(--text-muted)",
                        }}
                      />
                      <span>{s}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Area Size Slider */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--text-dark)",
                  }}
                >
                  3. Approximate Surface Area
                </label>
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  {areaSqFt.toLocaleString()} sq ft
                </span>
              </div>

              <input
                type="range"
                min="150"
                max="3500"
                step="50"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "5px",
                  outline: "none",
                  accentColor: "var(--accent-gold)",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginTop: "6px",
                }}
              >
                <span>Small Room (150 sq ft)</span>
                <span>Average Flat (750 sq ft)</span>
                <span>Large House (3,500 sq ft)</span>
              </div>
            </div>

            {/* Step 4: Paint Quality Grade */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--text-dark)",
                  marginBottom: "12px",
                }}
              >
                4. Paint Formulation & Specification
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  {
                    name: "Standard Trade (Clean Vinyl Matt)",
                    desc: "Durable, washable professional trade paint for rentals and high traffic.",
                  },
                  {
                    name: "Designer Matte (Farrow & Ball / Little Greene)",
                    desc: "High pigment depth, ultra-chalky finish, rich British heritage undertones.",
                  },
                  {
                    name: "Artisan Texture (Limewash / Venetian)",
                    desc: "Hand-trowelled mineral plaster and breathable decorative texture.",
                  },
                ].map((grade) => {
                  const isSelected = paintGrade === grade.name;
                  return (
                    <div
                      key={grade.name}
                      onClick={() => setPaintGrade(grade.name)}
                      style={{
                        padding: "14px 18px",
                        borderRadius: "12px",
                        border: isSelected ? "2px solid var(--accent-gold)" : "1px solid rgba(0,0,0,0.08)",
                        backgroundColor: isSelected ? "rgba(199, 146, 62, 0.05)" : "var(--surface-cream)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            border: isSelected ? "5px solid var(--accent-gold)" : "2px solid #cbd5e1",
                            backgroundColor: "#ffffff",
                          }}
                        />
                        <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-dark)" }}>
                          {grade.name}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                          marginTop: "4px",
                          marginLeft: "24px",
                        }}
                      >
                        {grade.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Card Column */}
          <div
            style={{
              backgroundColor: "var(--primary-navy)",
              borderRadius: "var(--radius-lg)",
              padding: "clamp(24px, 3.5vw, 36px)",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 16px 40px rgba(12, 20, 31, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(199, 146, 62, 0.2)",
                  color: "#f3be6a",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                <Sparkles size={14} />
                <span>Estimated Cost Range</span>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontSize: "0.88rem", color: "var(--text-light-muted)", display: "block" }}>
                  Estimated Project Investment:
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    marginTop: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                      fontWeight: 800,
                      fontFamily: "var(--font-outfit)",
                      color: "#ffffff",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    £{estimatedMin.toLocaleString()} - £{estimatedMax.toLocaleString()}
                  </span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-light-muted)", marginTop: "4px" }}>
                  *Includes master labor, prep materials, drop cloths & dustless cleanup
                </div>
              </div>

              {/* Estimate Highlights */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                  marginBottom: "28px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#f3be6a", fontSize: "0.8rem", marginBottom: "4px" }}>
                    <Clock size={14} />
                    <span>Est. Duration</span>
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>{estimatedDays}</div>
                </div>

                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#f3be6a", fontSize: "0.8rem", marginBottom: "4px" }}>
                    <PaintBucket size={14} />
                    <span>Est. Paint Volume</span>
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>~{paintLitres} Litres</div>
                </div>
              </div>

              {/* Inclusions Check list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem", color: "#cbd5e1" }}>
                  <CheckCircle2 size={16} color="var(--accent-gold)" />
                  <span>Free in-person color swatch sample book</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem", color: "#cbd5e1" }}>
                  <CheckCircle2 size={16} color="var(--accent-gold)" />
                  <span>Full floor & furniture masking with heavy cloth</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem", color: "#cbd5e1" }}>
                  <CheckCircle2 size={16} color="var(--accent-gold)" />
                  <span>5-Year peeling and bubbling craftsmanship warranty</span>
                </div>
              </div>
            </div>

            {/* Lock in quote button */}
            <button
              onClick={handleLockInQuote}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <span>Lock In This Free Quote</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 960px) {
          .calculator-grid {
            grid-template-columns: 1.25fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
