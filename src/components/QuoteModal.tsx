"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Paintbrush,
} from "lucide-react";
import { SITE_DATA } from "@/data/content";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialEstimate?: {
    roomType: string;
    scope: string;
    area: number;
    grade: string;
    estimatedMin: number;
    estimatedMax: number;
  } | null;
}

export default function QuoteModal({
  isOpen,
  onClose,
  initialService,
  initialEstimate,
}: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(initialService || "Interior Painting");
  const [propertyType, setPropertyType] = useState(
    initialEstimate ? initialEstimate.roomType : "Residential Apartment"
  );
  const [timeline, setTimeline] = useState("Within 1-2 Weeks");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteRef, setQuoteRef] = useState("CX-842915");

  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialEstimate) setPropertyType(initialEstimate.roomType);
  }, [initialService, initialEstimate]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedRef = `CX-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteRef(generatedRef);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference_id: generatedRef,
          service,
          property_type: propertyType,
          timeline,
          name,
          email,
          phone,
          postcode,
          notes,
          estimate_min: initialEstimate ? initialEstimate.estimatedMin : null,
          estimate_max: initialEstimate ? initialEstimate.estimatedMax : null,
          estimate_details: initialEstimate || null,
        }),
      });

      const data = await res.json();
      if (data?.referenceId) {
        setQuoteRef(data.referenceId);
      }
    } catch (err) {
      console.warn("Notice during quote save:", err);
    } finally {
      setIsSubmitting(false);
      setStep(3);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#c7923e", "#106669", "#b85d43", "#f3be6a"],
      });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(12, 20, 31, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-xl)",
          maxWidth: "580px",
          width: "100%",
          maxHeight: "calc(100vh - 32px)",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "14px 20px",
            backgroundColor: "var(--primary-navy)",
            color: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "rgba(199, 146, 62, 0.2)",
                color: "var(--accent-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Paintbrush size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Get a Free Painting Quote
              </h3>
              <p style={{ fontSize: "0.72rem", color: "var(--text-light-muted)", margin: 0 }}>
                Fast, itemized & no obligation • West London
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#cbd5e1",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close quote modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "18px 22px", overflowY: "auto" }}>
          {step === 3 ? (
            /* Success Step */
            <div style={{ textAlign: "center", padding: "12px 6px" }}>
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(16, 102, 105, 0.15)",
                  color: "var(--accent-teal)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px auto",
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-dark)", marginBottom: "8px" }}>
                Quote Request Received!
              </h3>

              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5, maxWidth: "440px", margin: "0 auto 18px auto" }}>
                Thank you, <strong>{name || "Valued Client"}</strong>. We’ve logged your
                enquiry (Ref: <strong>{quoteRef}</strong>).
                Our senior decorating surveyor will call you at <strong>{phone || "your number"}</strong> to
                finalize your complimentary color consultation.
              </p>

              {initialEstimate && (
                <div
                  style={{
                    backgroundColor: "var(--surface-cream)",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-gold)",
                    marginBottom: "18px",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Estimated Scope Locked In:
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--primary-navy)", marginTop: "2px" }}>
                    £{initialEstimate.estimatedMin} - £{initialEstimate.estimatedMax} ({initialEstimate.roomType})
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    {initialEstimate.scope} • {initialEstimate.grade}
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className="btn-primary"
                style={{ padding: "11px 28px", fontSize: "0.9rem" }}
              >
                Back to Website
              </button>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit}>
              {/* Progress Indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <div
                  style={{
                    flex: 1,
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: "var(--accent-gold)",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: step === 2 ? "var(--accent-gold)" : "#e2e8f0",
                  }}
                />
              </div>

              {step === 1 ? (
                /* Step 1: Project Scope - Compact & No Scrolling Required */
                <div>
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Step 1 of 2 • Project Scope
                    </span>
                    <h4 style={{ fontSize: "1.12rem", fontWeight: 700, color: "var(--text-dark)", margin: "2px 0 0 0" }}>
                      Tell us about your project
                    </h4>
                  </div>

                  {/* 2-column Grid for Service & Property Type */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-dark)", marginBottom: "4px" }}>
                        Required Service
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "9px 11px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.86rem",
                          backgroundColor: "#f8fafc",
                          outline: "none",
                        }}
                      >
                        <option value="Interior Painting">Interior Painting</option>
                        <option value="Exterior Painting">Exterior Painting</option>
                        <option value="Waterproof Coating">Waterproof Coating</option>
                        <option value="Wood Painting & Polish">Wood Painting & Polish</option>
                        <option value="Decorative Wall Design">Decorative Wall Design</option>
                        <option value="Crack & Gap Filling">Crack & Gap Filling</option>
                        <option value="Commercial Painting">Commercial Painting</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-dark)", marginBottom: "4px" }}>
                        Property / Space Type
                      </label>
                      <input
                        type="text"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        placeholder="e.g. 2-Bed Victorian Flat"
                        style={{
                          width: "100%",
                          padding: "9px 11px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.86rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Desired Timeline 4-button row */}
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-dark)", marginBottom: "5px" }}>
                      Desired Timeline
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
                      {[
                        { id: "Urgent / 24-48 Hours", label: "Urgent (24-48h)" },
                        { id: "Within 1-2 Weeks", label: "1-2 Weeks" },
                        { id: "Next Month", label: "Next Month" },
                        { id: "Flexible", label: "Flexible" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTimeline(t.id)}
                          style={{
                            padding: "8px 4px",
                            borderRadius: "7px",
                            fontSize: "0.75rem",
                            fontWeight: timeline === t.id ? 700 : 500,
                            backgroundColor: timeline === t.id ? "var(--primary-navy)" : "#f8fafc",
                            color: timeline === t.id ? "#ffffff" : "var(--text-dark)",
                            border: timeline === t.id ? "1px solid var(--primary-navy)" : "1px solid #e2e8f0",
                            cursor: "pointer",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Continue Button - Always Visible Without Scrolling */}
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    <span>Continue to Contact Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                /* Step 2: Contact Details - Streamlined & No Scrolling Required */
                <div>
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Step 2 of 2 • Contact & Details
                    </span>
                    <h4 style={{ fontSize: "1.12rem", fontWeight: 700, color: "var(--text-dark)", margin: "2px 0 0 0" }}>
                      Where should we send your quote?
                    </h4>
                  </div>

                  {/* Full Name */}
                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-dark)", marginBottom: "3px" }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Emma Richardson"
                      style={{
                        width: "100%",
                        padding: "9px 11px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.86rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* 2-column Grid for Phone & Email */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-dark)", marginBottom: "3px" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 7123 456789"
                        style={{
                          width: "100%",
                          padding: "9px 11px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.86rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-dark)", marginBottom: "3px" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="emma@example.co.uk"
                        style={{
                          width: "100%",
                          padding: "9px 11px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.86rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* 2-column Grid for Postcode & Details */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-dark)", marginBottom: "3px" }}>
                        London Postcode / Area
                      </label>
                      <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="e.g. W8 4BA (Kensington)"
                        style={{
                          width: "100%",
                          padding: "9px 11px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.86rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-dark)", marginBottom: "3px" }}>
                        Project Details (Optional)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Ceiling heights, paint preferences..."
                        style={{
                          width: "100%",
                          padding: "9px 11px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.86rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{
                        padding: "11px 18px",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid #cbd5e1",
                        backgroundColor: "#f8fafc",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{
                        flex: 1,
                        padding: "11px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                      }}
                    >
                      <span>{isSubmitting ? "Generating Quote..." : "Submit Quote Request"}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
