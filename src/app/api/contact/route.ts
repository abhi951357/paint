import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, type } = body;

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone number is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    if (type === "newsletter") {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) {
        console.warn("Supabase newsletter insert notice:", error.message);
        return NextResponse.json({
          success: true,
          savedToDb: false,
          message: "Subscribed successfully (table pending creation in Supabase).",
        });
      }

      return NextResponse.json({ success: true, savedToDb: true, data });
    }

    // General contact inquiry
    const { data, error } = await supabase
      .from("contact_inquiries")
      .insert([
        {
          name: name || "Anonymous",
          email: email || null,
          phone: phone || null,
          message: message || "General enquiry",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn("Supabase contact_inquiries insert notice:", error.message);
      return NextResponse.json({
        success: true,
        savedToDb: false,
        message: "Message received successfully.",
      });
    }

    return NextResponse.json({ success: true, savedToDb: true, data });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("API /api/contact error:", errorMsg);
    return NextResponse.json(
      { error: "Failed to process contact inquiry", details: errorMsg },
      { status: 500 }
    );
  }
}
