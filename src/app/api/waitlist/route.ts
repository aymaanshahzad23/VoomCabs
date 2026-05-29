import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { waitlistSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { message: "Waitlist is not configured yet." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.trim() !== ""
  ) {
    // Honeypot: silently accept bot-like submits.
    return NextResponse.json({ message: "Received." }, { status: 200 });
  }

  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const field = firstIssue?.path?.[0];
    const messageByField: Record<string, string> = {
      email: "Please enter a valid email and try again.",
      name: "Name looks too long. Please shorten it.",
      city: "City looks too long. Please shorten it.",
    };

    return NextResponse.json(
      { message: messageByField[String(field)] || "Please check your details and try again." },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("waitlist").insert([
    {
      email: parsed.data.email,
      name: parsed.data.name || null,
      city: parsed.data.city || null,
    },
  ]);

  if (error?.code === "PGRST205") {
    const fallback = await supabase.from("waitlist_signups").insert({
      email: parsed.data.email,
      full_name: parsed.data.name || null,
      city: parsed.data.city || null,
      source: "landing-page",
    });

    if (!fallback.error) {
      return NextResponse.json(
        { message: "You're in. Early access updates are coming your way." },
        { status: 201 },
      );
    }
  }

  if (error && error.code === "23505") {
    return NextResponse.json(
      { message: "You are already on the waitlist. We will keep you posted." },
      { status: 200 },
    );
  }

  if (error) {
    console.error("Waitlist insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    if (error.code === "PGRST205") {
      return NextResponse.json(
        {
          message:
            "Waitlist table is missing in Supabase. Please create 'public.waitlist' or 'public.waitlist_signups'.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "You're in. Early access updates are coming your way." },
    { status: 201 },
  );
}
