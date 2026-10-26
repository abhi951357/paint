"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsAbout from "@/components/StatsAbout";
import ServicesSection from "@/components/ServicesSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import ProcessSection from "@/components/ProcessSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import BenefitsSection from "@/components/BenefitsSection";
import CtaEmergency from "@/components/CtaEmergency";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import VideoModal from "@/components/VideoModal";
import { Phone, Sparkles } from "lucide-react";
import { SITE_DATA } from "@/data/content";

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Waterproof Coating");
  const [currentEstimate, setCurrentEstimate] = useState<any>(null);

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setQuoteModalOpen(true);
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* Navigation Header */}
      <Header onOpenQuote={() => handleOpenQuote()} />

      {/* Hero Section with Interactive Live Room Visualizer */}
      <Hero onOpenQuote={() => handleOpenQuote()} />

      {/* About Us & 4 Big Stats Grid */}
      <StatsAbout />

      {/* Comprehensive Services Grid */}
      <ServicesSection onSelectService={(s) => handleOpenQuote(s)} />

      {/* Projects Showcase & Portfolio */}
      <ProjectsGallery onOpenQuote={() => handleOpenQuote()} />

      {/* 4-Step Professional Process */}
      <ProcessSection />

      {/* Why Choose Us & Video Modal Trigger */}
      <WhyChooseUs
        onOpenVideo={() => setVideoModalOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Verified Client Testimonials */}
      <TestimonialsSection />

      {/* The 5 Key Benefits */}
      <BenefitsSection />

      {/* 24/7 Emergency & Rapid Response CTA Section */}
      <CtaEmergency onOpenQuote={() => handleOpenQuote()} />

      {/* Comprehensive Footer */}
      <Footer />

      {/* Floating Action Quick Access Pill */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 90,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <a
          href={`tel:${SITE_DATA.phoneLondon}`}
          className="btn-dark"
          style={{
            padding: "12px 18px",
            fontSize: "0.85rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
            display: "none",
          }}
          id="floating-call-btn"
        >
          <Phone size={16} color="var(--accent-gold)" />
          <span>Call 24/7</span>
        </a>

        <button
          onClick={() => handleOpenQuote()}
          className="btn-primary animate-pulse-glow"
          style={{
            padding: "14px 22px",
            fontSize: "0.92rem",
            boxShadow: "0 10px 30px rgba(199, 146, 62, 0.4)",
          }}
        >
          <Sparkles size={16} />
          <span>Free Quote</span>
        </button>
      </div>

      {/* Interactive Multi-step Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedService}
        initialEstimate={currentEstimate}
      />

      {/* 1m 23s Documentary Video Showcase Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onOpenQuote={() => handleOpenQuote()}
      />

      <style jsx>{`
        @media (min-width: 640px) {
          #floating-call-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </main>
  );
}
