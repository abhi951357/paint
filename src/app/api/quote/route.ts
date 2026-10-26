import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      reference_id,
      service,
      property_type,
      timeline,
      name,
      email,
      phone,
      postcode,
      notes,
      estimate_min,
      estimate_max,
      estimate_details,
    } = body;

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: "Name and at least one contact method (phone or email) are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    const newQuoteRecord = {
      reference_id: reference_id || `CX-${Math.floor(100000 + Math.random() * 900000)}`,
      service: service || "Painting & Decorating",
      property_type: property_type || "Residential",
      timeline: timeline || "Flexible",
      name: name.trim(),
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      postcode: postcode ? postcode.trim().toUpperCase() : null,
      notes: notes ? notes.trim() : null,
      estimate_min: typeof estimate_min === "number" ? estimate_min : null,
      estimate_max: typeof estimate_max === "number" ? estimate_max : null,
      estimate_details: estimate_details || null,
      status: "new",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("quote_requests")
      .insert([newQuoteRecord])
      .select()
      .single();

    if (error) {
      console.warn("Supabase quote_requests insert notification:", error.message);
      return NextResponse.json({
        success: true,
        savedToDb: false,
        referenceId: newQuoteRecord.reference_id,
        dbError: error.message,
        message: "Quote received! Database table 'quote_requests' can be created using the provided SQL script in the Supabase SQL Editor.",
      });
    }

    return NextResponse.json({
      success: true,
      savedToDb: true,
      referenceId: newQuoteRecord.reference_id,
      data,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("API /api/quote error:", errorMsg);
    return NextResponse.json(
      { error: "Failed to process quote request", details: errorMsg },
      { status: 500 }
    );
  }
}

// GET all quotes (for management dashboard)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const supabase = getSupabaseServerClient();

    let query = supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%,reference_id.ilike.%${search}%,postcode.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message, tableExists: false, quotes: [] },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      tableExists: true,
      quotes: data || [],
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: "Failed to fetch quotes", details: errorMsg },
      { status: 500 }
    );
  }
}

// PATCH to update quote status or notes
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, reference_id, status, admin_notes } = body;

    if (!id && !reference_id) {
      return NextResponse.json(
        { error: "Record id or reference_id is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (status !== undefined) updates.status = status;
    if (admin_notes !== undefined) updates.admin_notes = admin_notes;

    let query = supabase.from("quote_requests").update(updates);
    if (id) {
      query = query.eq("id", id);
    } else {
      query = query.eq("reference_id", reference_id);
    }

    const { data, error } = await query.select().single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: "Failed to update quote", details: errorMsg },
      { status: 500 }
    );
  }
}

// DELETE a quote
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const reference_id = searchParams.get("reference_id");

    if (!id && !reference_id) {
      return NextResponse.json(
        { error: "Record id or reference_id is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    let query = supabase.from("quote_requests").delete();

    if (id) {
      query = query.eq("id", id);
    } else {
      query = query.eq("reference_id", reference_id!);
    }

    const { error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, deleted: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: "Failed to delete quote", details: errorMsg },
      { status: 500 }
    );
  }
}
