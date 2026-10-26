import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const envUser = process.env.ADMIN_USERNAME || "admin";
    const envEmail = process.env.ADMIN_EMAIL || "admin@colorixpainting.co.uk";
    const envPass = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    const trimmedUser = username.trim().toLowerCase();
    const isUserValid =
      trimmedUser === envUser.toLowerCase() ||
      trimmedUser === envEmail.toLowerCase();
    const isPassValid = envPass && password === envPass;

    // Check credentials against environment variables
    if (isUserValid && isPassValid) {
      return NextResponse.json({
        success: true,
        user: {
          username: envUser,
          email: envEmail,
        },
      });
    }

    // Also support fallback via Supabase Auth
    try {
      const supabase = getSupabaseServerClient();
      const emailToTry = username.includes("@") ? username.trim() : envEmail;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToTry,
        password,
      });

      if (!error && data.session) {
        return NextResponse.json({
          success: true,
          user: {
            email: data.user?.email || envEmail,
          },
        });
      }
    } catch {
      // Continue to unauthorized response
    }

    return NextResponse.json(
      { error: "Invalid admin username or password." },
      { status: 401 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: "Authentication failed", details: errorMsg },
      { status: 500 }
    );
  }
}
