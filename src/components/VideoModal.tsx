"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2 } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export default function VideoModal({ isOpen, onClose, onOpenQuote }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(38);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(12, 20, 31, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "840px",
          backgroundColor: "#000000",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Video Header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "16px 20px",
            background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem" }}>
              Colorix Craftsmanship Documentary • London Master Painters
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
              Filmed on location in Kensington & Chelsea
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close video"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Canvas Area */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            backgroundColor: "#0a0a0a",
          }}
        >
          <Image
            src="/images/decorative.jpg"
            alt="Colorix master craftsman at work"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />

          {/* Cinematic subtle vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Center Play Overlay if paused */}
          {!isPlaying && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <button
                onClick={() => setIsPlaying(true)}
                style={{
                  width: "74px",
                  height: "74px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-gold)",
                  color: "#ffffff",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(199, 146, 62, 0.6)",
                }}
              >
                <Play size={32} fill="#ffffff" style={{ marginLeft: "4px" }} />
              </button>
            </div>
          )}

          {/* Floating On-Screen Subtitle */}
          <div
            style={{
              position: "absolute",
              bottom: "70px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              padding: "6px 16px",
              borderRadius: "6px",
              color: "#ffffff",
              fontSize: "0.85rem",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            “Precision masking and dustless prep are why our finishes outlast ordinary decorating by years.”
          </div>
        </div>

        {/* Custom Video Controls Bar */}
        <div
          style={{
            backgroundColor: "#111827",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              height: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "3px",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              setProgress(Math.round(clickPos * 100));
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "var(--accent-gold)",
                borderRadius: "3px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} fill="#ffffff" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                0:31 / 1:23
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="btn-primary"
                style={{ padding: "8px 18px", fontSize: "0.82rem" }}
              >
                <span>Book This Team</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
