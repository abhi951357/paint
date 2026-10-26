"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SITE_DATA } from "@/data/content";
import {
  Award,
  Sparkles,
  Repeat,
  Clock,
  HeartHandshake,
} from "lucide-react";

function AnimatedStatNumber({
  target,
  suffix = "",
  startAnimation,
}: {
  target: number;
  suffix?: string;
  startAnimation: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds smooth count up

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // smooth cubic ease out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [startAnimation, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsAbout() {
  const statIcons = [Award, HeartHandshake, Clock, Repeat];
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStartedAnimation(true);
          observer.disconnect(); // plays only once!
        }
      },
      {
        threshold: 0.25,
      }
    );

    if (statsContainerRef.current) {
      observer.observe(statsContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const statsConfig = [
    { target: 35, suffix: "k+" },
    { target: 99, suffix: "%" },
    { target: 25, suffix: "", unit: "yrs" },
    { target: 75, suffix: "%" },
  ];

  return (
    <section
      id="about"
      style={{
        padding: "90px 0 100px 0",
        backgroundColor: "var(--surface-white)",
        position: "relative",
      }}
    >
      <div className="colorix-container">
        {/* Top Header Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "28px",
            alignItems: "flex-end",
            marginBottom: "52px",
          }}
          className="about-header-grid"
        >
          <div>
            <div className="section-badge">
              <Sparkles size={14} color="var(--accent-gold)" />
              <span>About Us</span>
            </div>
            <h2 className="section-title" style={{ lineHeight: 1.12 }}>
              Experience <br />
              You Can Trust
            </h2>
          </div>

          <div>
            <p
              style={{
                fontSize: "1.16rem",
                lineHeight: "1.75",
                color: "#1e293b",
                fontWeight: 500,
                maxWidth: "600px",
              }}
            >
              At Colorix, painting is more than a service — it’s an enduring craft. We
              are a team of dedicated professionals committed to transforming homes and
              commercial spaces across West London with passion, precision, and
              uncompromising quality.
            </p>
          </div>
        </div>

        {/* 3 Staggered Mosaic Images from User Reference */}
        <div
          style={{
            position: "relative",
            marginBottom: "80px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.35fr 1fr",
              gap: "24px",
              alignItems: "center",
              maxWidth: "1080px",
              margin: "0 auto",
            }}
            className="about-three-images"
          >
            {/* Image 1: Left (Lower Offset - Painting Yellow Shutter with Brush) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "320px",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 16px 36px rgba(0, 0, 0, 0.09)",
                marginTop: "70px",
                backgroundColor: "#f2eee5",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                transition: "transform 0.3s ease",
              }}
              className="about-image-card"
            >
              <Image
                src="/images/about_1.jpg"
                alt="Craftsman painting yellow shutters with precision brush"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Image 2: Center (Tall & Featured - Painter Holding Blue Paint Roller) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "480px",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 24px 55px rgba(0, 0, 0, 0.12)",
                backgroundColor: "#f0ece3",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                transition: "transform 0.3s ease",
              }}
              className="about-image-card"
            >
              <Image
                src="/images/about_2.jpg"
                alt="Master painter with paint roller and premium color buckets"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Image 3: Right (Upper Offset - Smiling Painter Rolling Colorful Wall) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "330px",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 16px 36px rgba(0, 0, 0, 0.09)",
                marginBottom: "70px",
                backgroundColor: "#f2eee5",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                transition: "transform 0.3s ease",
              }}
              className="about-image-card"
            >
              <Image
                src="/images/about_3.jpg"
                alt="Smiling painter applying smooth finish to feature wall"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* 4 Big Stats Grid */}
        <div
          ref={statsContainerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: 0,
          }}
        >
          {SITE_DATA.stats.map((stat, idx) => {
            const IconComponent = statIcons[idx % statIcons.length];
            const cfg = statsConfig[idx] || { target: 0, suffix: "" };
            return (
              <div
                key={stat.label}
                style={{
                  backgroundColor: "#f7f5ed",
                  borderRadius: "var(--radius-lg)",
                  padding: "36px 28px",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.borderColor = "#f55d28";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.06)";
                }}
              >
                {/* Decorative icon backdrop */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    color: "rgba(245, 93, 40, 0.15)",
                  }}
                >
                  <IconComponent size={36} />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(2.6rem, 4vw, 3.4rem)",
                      fontWeight: 800,
                      fontFamily: "var(--font-outfit)",
                      color: "#f55d28",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    <AnimatedStatNumber
                      target={cfg.target}
                      suffix={cfg.suffix}
                      startAnimation={hasStartedAnimation}
                    />
                  </span>
                  {cfg.unit && (
                    <span
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "#f55d28",
                      }}
                    >
                      {cfg.unit}
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#161d2a",
                    lineHeight: 1.3,
                  }}
                >
                  {stat.label}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .about-image-card:hover {
          transform: translateY(-5px);
        }
        @media (min-width: 900px) {
          .about-header-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 820px) {
          .about-three-images {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .about-three-images > div {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            height: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}
