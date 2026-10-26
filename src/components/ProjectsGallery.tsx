"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE_DATA, ProjectItem } from "@/data/content";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface ProjectsGalleryProps {
  onOpenQuote: () => void;
}

export default function ProjectsGallery({ onOpenQuote }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Accent & Feature Walls",
    "Interior Painting",
    "Exterior Painting",
    "Commercial Painting",
  ];

  const filteredProjects =
    activeCategory === "All"
      ? SITE_DATA.projects
      : SITE_DATA.projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      style={{
        padding: "100px 0",
        backgroundColor: "var(--surface-white)",
      }}
    >
      <div className="colorix-container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <div>
            <div className="section-badge">
              <Sparkles size={14} color="var(--accent-gold)" />
              <span>Portfolio</span>
            </div>
            <h2 className="section-title">Our Painting Projects</h2>
            <p className="section-subtitle">
              Explore recent residential and commercial transformations executed by
              our master painters across West London.
            </p>
          </div>

          <button onClick={onOpenQuote} className="btn-primary">
            <span>Discuss Your Project</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isActive
                    ? "1px solid var(--accent-gold)"
                    : "1px solid rgba(15, 23, 42, 0.08)",
                  backgroundColor: isActive
                    ? "var(--primary-navy)"
                    : "var(--surface-cream)",
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "0 4px 14px rgba(12, 20, 31, 0.2)" : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "32px",
          }}
        >
          {filteredProjects.map((project: ProjectItem) => (
            <div
              key={project.id}
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                boxShadow: "var(--shadow-md)",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.35s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "var(--shadow-xl)";
                e.currentTarget.style.borderColor = "var(--border-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.08)";
              }}
              onClick={onOpenQuote}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "380px",
                  overflow: "hidden",
                  backgroundColor: "#eae7df",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>

              <div style={{ padding: "22px 24px" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--text-dark)",
                    margin: 0,
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
