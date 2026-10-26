"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Paintbrush,
  Search,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowLeft,
  Filter,
  ExternalLink,
  Copy,
  Check,
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { QuoteRequest, QuoteStatus } from "@/lib/supabase/types";

export default function AdminQuotesPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Quotes state
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [tableExists, setTableExists] = useState<boolean>(true);
  const [copiedSql, setCopiedSql] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  // Check stored session or Supabase session on load
  useEffect(() => {
    async function checkSession() {
      try {
        const storedAuth = typeof window !== "undefined" ? sessionStorage.getItem("colorix_admin_auth") : null;
        const storedEmail = typeof window !== "undefined" ? sessionStorage.getItem("colorix_admin_email") : null;

        if (storedAuth === "true") {
          setIsAuthenticated(true);
          setUserEmail(storedEmail || "admin");
          setAuthLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || "admin");
        }
      } catch (err) {
        console.warn("Session check notice:", err);
      } finally {
        setAuthLoading(false);
      }
    }

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || "admin");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/quote", window.location.origin);
      if (selectedStatus !== "all") url.searchParams.set("status", selectedStatus);
      if (searchTerm) url.searchParams.set("search", searchTerm);

      const res = await fetch(url.toString());
      const data = await res.json();

      if (data.tableExists === false) {
        setTableExists(false);
        setQuotes([]);
      } else {
        setTableExists(true);
        setQuotes(data.quotes || []);
      }
    } catch (err) {
      console.error("Failed to fetch quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuotes();
    }
  }, [selectedStatus, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setLoginError(data.error || "Invalid username or password.");
      } else {
        setIsAuthenticated(true);
        const resolvedEmail = data.user?.email || data.user?.username || "admin";
        setUserEmail(resolvedEmail);
        sessionStorage.setItem("colorix_admin_auth", "true");
        sessionStorage.setItem("colorix_admin_email", resolvedEmail);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setLoginError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    sessionStorage.removeItem("colorix_admin_auth");
    sessionStorage.removeItem("colorix_admin_email");
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setQuotes([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchQuotes();
  };

  const handleStatusChange = async (quote: QuoteRequest, newStatus: QuoteStatus) => {
    setUpdatingId(quote.reference_id);
    try {
      const res = await fetch("/api/quote", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference_id: quote.reference_id,
          status: newStatus,
        }),
      });
      if (res.ok) {
        setQuotes((prev) =>
          prev.map((q) =>
            q.reference_id === quote.reference_id ? { ...q, status: newStatus } : q
          )
        );
        if (selectedQuote?.reference_id === quote.reference_id) {
          setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: QuoteStatus) => {
    const config: Record<QuoteStatus, { bg: string; color: string; label: string }> = {
      new: { bg: "#fef3c7", color: "#92400e", label: "New Lead" },
      contacted: { bg: "#e0f2fe", color: "#0369a1", label: "Contacted" },
      survey_scheduled: { bg: "#f3e8ff", color: "#6b21a8", label: "Survey Booked" },
      in_progress: { bg: "#e0e7ff", color: "#3730a3", label: "In Progress" },
      completed: { bg: "#dcfce7", color: "#166534", label: "Completed" },
      cancelled: { bg: "#f1f5f9", color: "#475569", label: "Cancelled" },
    };
    const c = config[status] || config.new;
    return (
      <span
        style={{
          backgroundColor: c.bg,
          color: c.color,
          padding: "4px 10px",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: c.color,
          }}
        />
        {c.label}
      </span>
    );
  };

  const sqlCode = `-- Run this in Supabase Dashboard -> SQL Editor -> Run
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL UNIQUE,
    service TEXT NOT NULL,
    property_type TEXT,
    timeline TEXT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    postcode TEXT,
    notes TEXT,
    estimate_min NUMERIC,
    estimate_max NUMERIC,
    estimate_details JSONB,
    status TEXT NOT NULL DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts for quote_requests" 
ON public.quote_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow service and authenticated read for quote_requests" 
ON public.quote_requests FOR SELECT TO authenticated, service_role USING (true);

CREATE POLICY "Allow service and authenticated update for quote_requests" 
ON public.quote_requests FOR UPDATE TO authenticated, service_role USING (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  // 1. Loading screen while checking existing session
  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#070c14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "var(--font-outfit), sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <RefreshCw size={32} className="animate-spin" color="var(--accent-gold)" style={{ margin: "0 auto 16px auto" }} />
          <p style={{ fontSize: "0.95rem", color: "#94a3b8" }}>Authenticating Colorix Admin...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated: Render Sleek Admin Login Form
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#070c14",
          backgroundImage: "radial-gradient(ellipse at 50% 20%, rgba(199, 146, 62, 0.12) 0%, rgba(7, 12, 20, 0.95) 75%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "var(--font-outfit), sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "440px",
            width: "100%",
            backgroundColor: "#0c141f",
            borderRadius: "18px",
            border: "1px solid rgba(199, 146, 62, 0.25)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
            padding: "36px 32px",
            color: "#ffffff",
          }}
        >
          {/* Logo & Header */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "rgba(199, 146, 62, 0.2)",
                color: "var(--accent-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
                border: "1px solid rgba(199, 146, 62, 0.4)",
              }}
            >
              <Paintbrush size={26} />
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
              COLORIX ADMIN
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              Lead Management & Database Portal
            </p>
          </div>

          {/* Error Notice */}
          {loginError && (
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#fca5a5",
                borderRadius: "10px",
                padding: "12px 14px",
                fontSize: "0.84rem",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Username / Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                Username or Email
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                }}
              >
                <User size={16} color="var(--accent-gold)" />
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin or admin@colorixpainting.co.uk"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#ffffff",
                    fontSize: "0.92rem",
                    width: "100%",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                Admin Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                }}
              >
                <Lock size={16} color="var(--accent-gold)" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#ffffff",
                    fontSize: "0.92rem",
                    width: "100%",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <span>{isLoggingIn ? "Authenticating..." : "Sign In to Admin Portal"}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Footer note & back link */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "18px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.78rem",
              color: "#94a3b8",
            }}
          >
            <span style={{ color: "#64748b" }}>
              Protected by environment credentials
            </span>
            <Link href="/" style={{ color: "var(--accent-gold)", textDecoration: "none", fontWeight: 600 }}>
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated: Render Full Admin Leads Management Portal
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* Top Navbar */}
      <header
        style={{
          backgroundColor: "#0c141f",
          color: "#ffffff",
          padding: "16px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#94a3b8",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} />
            <span>View Website</span>
          </Link>
          <div style={{ height: "18px", width: "1px", backgroundColor: "rgba(255,255,255,0.15)" }} />
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
              <Paintbrush size={18} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                COLORIX Leads Management
              </h1>
              <p style={{ fontSize: "0.72rem", color: "#94a3b8", margin: 0 }}>
                Supabase Connected (xjnillasaxtwwxoolnzc)
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* User Email & Role Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255,255,255,0.06)",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "0.8rem",
              color: "#cbd5e1",
            }}
          >
            <ShieldCheck size={15} color="var(--accent-gold)" />
            <span>{userEmail || "admin@colorixpainting.co.uk"}</span>
          </div>

          <button
            onClick={fetchQuotes}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#ffffff",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.82rem",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleSignOut}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#fca5a5",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        {/* If table is pending creation in Supabase */}
        {!tableExists && (
          <div
            style={{
              backgroundColor: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: "12px",
              padding: "20px 24px",
              marginBottom: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#b45309" }}>
              <AlertCircle size={22} />
              <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
                Database Table &apos;quote_requests&apos; Setup
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#78350f", lineHeight: 1.5 }}>
              Your Supabase credentials are authenticated! To enable persistent storage, run the SQL script below in your Supabase SQL Editor. Once run, all pop-up submissions are stored and managed here in real-time.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" }}>
              <button
                onClick={copySql}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#b45309",
                  color: "#ffffff",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {copiedSql ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedSql ? "SQL Copied!" : "Copy SQL Script"}</span>
              </button>
              <a
                href="https://supabase.com/dashboard/project/xjnillasaxtwwxoolnzc/sql/new"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#ffffff",
                  color: "#b45309",
                  border: "1px solid #fde68a",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>Open Supabase SQL Editor</span>
                <ExternalLink size={14} />
              </a>
              <button
                onClick={fetchQuotes}
                style={{
                  backgroundColor: "transparent",
                  color: "#78350f",
                  border: "1px solid #d97706",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                }}
              >
                I&apos;ve Executed the SQL - Check Now
              </button>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {[
            {
              label: "Total Submissions",
              value: quotes.length,
              color: "var(--primary-navy)",
              bg: "#ffffff",
            },
            {
              label: "New Leads",
              value: quotes.filter((q) => q.status === "new").length,
              color: "#92400e",
              bg: "#fef3c7",
            },
            {
              label: "Surveys Booked",
              value: quotes.filter((q) => q.status === "survey_scheduled").length,
              color: "#6b21a8",
              bg: "#f3e8ff",
            },
            {
              label: "Completed",
              value: quotes.filter((q) => q.status === "completed").length,
              color: "#166534",
              bg: "#dcfce7",
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: stat.bg,
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>{stat.label}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: stat.color, marginTop: "4px" }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search Bar */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            padding: "16px 20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 320px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "8px 12px",
                width: "100%",
              }}
            >
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, phone, email, reference ID, postcode..."
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  outline: "none",
                  fontSize: "0.88rem",
                  width: "100%",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#0c141f",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "9px 16px",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </form>

          {/* Status Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto" }}>
            <Filter size={16} color="#64748b" />
            {[
              { id: "all", label: "All" },
              { id: "new", label: "New" },
              { id: "contacted", label: "Contacted" },
              { id: "survey_scheduled", label: "Survey" },
              { id: "in_progress", label: "In Progress" },
              { id: "completed", label: "Done" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedStatus(f.id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: selectedStatus === f.id ? "1px solid #0c141f" : "1px solid #e2e8f0",
                  backgroundColor: selectedStatus === f.id ? "#0c141f" : "#f8fafc",
                  color: selectedStatus === f.id ? "#ffffff" : "#475569",
                  fontSize: "0.78rem",
                  fontWeight: selectedStatus === f.id ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quotes Data Table */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          {loading ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#64748b" }}>
              <RefreshCw size={28} className="animate-spin" style={{ margin: "0 auto 12px auto" }} />
              <p style={{ margin: 0, fontSize: "0.92rem" }}>Loading submissions from Supabase...</p>
            </div>
          ) : quotes.length === 0 ? (
            <div style={{ padding: "64px 24px", textAlign: "center", color: "#64748b" }}>
              <Database size={40} style={{ color: "#cbd5e1", margin: "0 auto 14px auto" }} />
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 6px 0" }}>
                No Quote Submissions Yet
              </h4>
              <p style={{ fontSize: "0.88rem", maxWidth: "420px", margin: "0 auto 18px auto" }}>
                When customers submit the pop-up form on the website, their details, estimate scope, and notes will show up here.
              </p>
              <Link
                href="/"
                className="btn-primary"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                }}
              >
                Test Submit from Website Pop-up
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#f8fafc",
                      borderBottom: "1px solid #e2e8f0",
                      fontSize: "0.78rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#64748b",
                    }}
                  >
                    <th style={{ padding: "14px 18px" }}>Reference & Date</th>
                    <th style={{ padding: "14px 18px" }}>Client</th>
                    <th style={{ padding: "14px 18px" }}>Service & Property</th>
                    <th style={{ padding: "14px 18px" }}>Timeline</th>
                    <th style={{ padding: "14px 18px" }}>Estimate</th>
                    <th style={{ padding: "14px 18px" }}>Status</th>
                    <th style={{ padding: "14px 18px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "0.88rem" }}>
                  {quotes.map((q) => (
                    <tr
                      key={q.reference_id}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {/* Ref & Date */}
                      <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
                        <div style={{ fontWeight: 700, color: "var(--primary-navy)" }}>{q.reference_id}</div>
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
                          {q.created_at ? new Date(q.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          }) : "Recent"}
                        </div>
                      </td>

                      {/* Client */}
                      <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
                        <div style={{ fontWeight: 700, color: "#0f172a" }}>{q.name}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "0.8rem", marginTop: "2px" }}>
                          <Phone size={12} color="#94a3b8" />
                          <a href={`tel:${q.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                            {q.phone}
                          </a>
                        </div>
                        {q.email && (
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "0.78rem", marginTop: "2px" }}>
                            <Mail size={12} color="#94a3b8" />
                            <span>{q.email}</span>
                          </div>
                        )}
                        {q.postcode && (
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#b45309", fontSize: "0.75rem", marginTop: "3px" }}>
                            <MapPin size={11} />
                            <span>{q.postcode}</span>
                          </div>
                        )}
                      </td>

                      {/* Service & Property */}
                      <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b" }}>{q.service}</div>
                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                          {q.property_type || "Standard"}
                        </div>
                        {q.notes && (
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "#475569",
                              backgroundColor: "#f1f5f9",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              marginTop: "4px",
                              maxWidth: "240px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            title={q.notes}
                          >
                            &ldquo;{q.notes}&rdquo;
                          </div>
                        )}
                      </td>

                      {/* Timeline */}
                      <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "#334155" }}>
                          <Clock size={12} color="#94a3b8" />
                          <span>{q.timeline}</span>
                        </div>
                      </td>

                      {/* Estimate */}
                      <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
                        {q.estimate_min ? (
                          <div>
                            <span style={{ fontWeight: 700, color: "var(--accent-teal)" }}>
                              £{q.estimate_min} - £{q.estimate_max}
                            </span>
                            {q.estimate_details && (
                              <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                                {q.estimate_details.roomType}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>Custom Scope</span>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
                        <select
                          value={q.status}
                          disabled={updatingId === q.reference_id}
                          onChange={(e) => handleStatusChange(q, e.target.value as QuoteStatus)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            backgroundColor: "#f8fafc",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          <option value="new">New Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="survey_scheduled">Survey Booked</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "16px 18px", verticalAlign: "top", textAlign: "right" }}>
                        <button
                          onClick={() => setSelectedQuote(q)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            backgroundColor: "#ffffff",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(12, 20, 31, 0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedQuote(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              maxWidth: "560px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold)" }}>
                  QUOTE SUBMISSION
                </span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 0 0" }}>
                  {selectedQuote.reference_id}
                </h3>
              </div>
              {getStatusBadge(selectedQuote.status)}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.9rem" }}>
              <div style={{ backgroundColor: "#f8fafc", padding: "12px 16px", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Client Contact
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                  {selectedQuote.name}
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "4px" }}>
                  <a href={`tel:${selectedQuote.phone}`} style={{ color: "var(--accent-teal)", textDecoration: "none", fontWeight: 600 }}>
                    {selectedQuote.phone}
                  </a>
                  {selectedQuote.email && (
                    <a href={`mailto:${selectedQuote.email}`} style={{ color: "#64748b", textDecoration: "none" }}>
                      {selectedQuote.email}
                    </a>
                  )}
                </div>
                {selectedQuote.postcode && (
                  <div style={{ color: "#b45309", fontSize: "0.82rem", marginTop: "4px", fontWeight: 600 }}>
                    London Postcode: {selectedQuote.postcode}
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                    Service
                  </div>
                  <div style={{ fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                    {selectedQuote.service}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                    {selectedQuote.property_type}
                  </div>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                    Timeline
                  </div>
                  <div style={{ fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                    {selectedQuote.timeline}
                  </div>
                </div>
              </div>

              {selectedQuote.notes && (
                <div style={{ backgroundColor: "#f8fafc", padding: "12px 16px", borderRadius: "8px" }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                    Client Project Details / Notes
                  </div>
                  <p style={{ margin: "4px 0 0 0", color: "#334155", lineHeight: 1.5 }}>
                    {selectedQuote.notes}
                  </p>
                </div>
              )}

              {selectedQuote.estimate_details && (
                <div style={{ backgroundColor: "var(--surface-cream)", border: "1px solid var(--border-gold)", padding: "12px 16px", borderRadius: "8px" }}>
                  <div style={{ fontSize: "0.72rem", color: "#b45309", textTransform: "uppercase", fontWeight: 700 }}>
                    Calculated Estimate Scope
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-navy)", marginTop: "2px" }}>
                    £{selectedQuote.estimate_min} - £{selectedQuote.estimate_max}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {selectedQuote.estimate_details.roomType} • {selectedQuote.estimate_details.scope} • {selectedQuote.estimate_details.grade}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
              <button
                onClick={() => setSelectedQuote(null)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
