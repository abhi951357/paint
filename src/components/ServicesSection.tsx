"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE_DATA, ServiceItem } from "@/data/content";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Droplets,
  Trees,
  Layers,
  Sparkle,
  Brush,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  // Track which service cards are expanded
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const serviceIconMap: Record<string, any> = {
    "waterproof-coating": Droplets,
    "wood-painting-polish": Trees,
    "decorative-wall-design": Layers,
    "crack-gap-filling": Sparkle,
  };

  return (
    <section
      id="services"
      style={{
        padding: "100px 0",
        backgroundColor: "var(--surface-cream)",
        position: "relative",
      }}
    >
      <div className="colorix-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 60px auto" }}>
          <div className="section-badge" style={{ margin: "0 auto 16px auto" }}>
            <Sparkles size={14} color="var(--accent-gold)" />
            <span>Our Specialties</span>
          </div>
          <h2 className="section-title">
            Professional Painting Services for Every Space
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            From moisture-resistant coatings and artisan decorative plasters to
            bespoke woodwork polish, we combine master techniques with the finest
            paints on the market.
          </p>
        </div>

        {/* Services Grid: 4 Boxes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
            gap: "28px",
            alignItems: "start",
          }}
          className="services-grid"
        >
          {SITE_DATA.services.map((service: ServiceItem) => {
            const IconComp = serviceIconMap[service.id] || Brush;
            const isExpanded = expandedIds.has(service.id);

            return (
              <div
                key={service.id}
                className="service-horizontal-card"
              >
                {/* Image on the Left */}
                <div className="service-card-image-wrap">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1200px) 240px, 260px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Content on the Right */}
                <div
                  style={{
                    padding: "26px 28px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Headline with Icon */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          backgroundColor: "var(--accent-gold-soft)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--accent-gold)",
                          flexShrink: 0,
                        }}
                      >
                        <IconComp size={18} />
                      </div>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "var(--text-dark)",
                          lineHeight: 1.3,
                          margin: 0,
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p
                      style={{
                        fontSize: "0.92rem",
                        lineHeight: 1.6,
                        color: "var(--text-secondary)",
                        marginBottom: "18px",
                      }}
                    >
                      {service.description}
                    </p>

                    {/* Learn More Button */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(service.id)}
                      aria-expanded={isExpanded}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 18px",
                        borderRadius: "var(--radius-full)",
                        backgroundColor: isExpanded ? "var(--primary-navy)" : "#f4efe6",
                        color: isExpanded ? "#ffffff" : "var(--text-dark)",
                        border: "1px solid",
                        borderColor: isExpanded ? "var(--primary-navy)" : "rgba(199, 146, 62, 0.25)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.backgroundColor = "var(--primary-navy)";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.borderColor = "var(--primary-navy)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.backgroundColor = "#f4efe6";
                          e.currentTarget.style.color = "var(--text-dark)";
                          e.currentTarget.style.borderColor = "rgba(199, 146, 62, 0.25)";
                        }
                      }}
                    >
                      <span>{isExpanded ? "Show Less" : "Learn More"}</span>
                      <ChevronDown
                        size={14}
                        style={{
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </button>
                  </div>

                  {/* Remaining Details: Shown only when Learn More is clicked */}
                  {isExpanded && (
                    <div
                      className="service-details-expand"
                      style={{
                        marginTop: "18px",
                        paddingTop: "16px",
                        borderTop: "1px solid rgba(15, 23, 42, 0.08)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                      }}
                    >
                      {/* Badge & Category Pills */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        {service.badge && (
                          <span
                            style={{
                              backgroundColor: "rgba(12, 20, 31, 0.9)",
                              color: "#f3be6a",
                              padding: "4px 10px",
                              borderRadius: "var(--radius-full)",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              border: "1px solid rgba(199, 146, 62, 0.3)",
                            }}
                          >
                            {service.badge}
                          </span>
                        )}
                        <span
                          style={{
                            backgroundColor: "rgba(16, 102, 105, 0.1)",
                            color: "var(--accent-teal)",
                            padding: "4px 10px",
                            borderRadius: "var(--radius-full)",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                          }}
                        >
                          {service.category}
                        </span>
                      </div>

                      {/* Features Bullet List */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              fontSize: "0.84rem",
                              color: "var(--text-dark)",
                              fontWeight: 500,
                              lineHeight: 1.4,
                            }}
                          >
                            <CheckCircle
                              size={14}
                              color="var(--accent-teal)"
                              style={{ marginTop: "2px", flexShrink: 0 }}
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Request Quote Action Button */}
                      <button
                        onClick={() => onSelectService(service.title)}
                        style={{
                          width: "100%",
                          marginTop: "4px",
                          padding: "10px 16px",
                          borderRadius: "var(--radius-full)",
                          backgroundColor: "var(--surface-cream)",
                          color: "var(--text-dark)",
                          border: "1px solid var(--border-light)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--primary-navy)";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.borderColor = "var(--primary-navy)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--surface-cream)";
                          e.currentTarget.style.color = "var(--text-dark)";
                          e.currentTarget.style.borderColor = "var(--border-light)";
                        }}
                      >
                        <span>Request Quote for {service.title}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
