import { NextResponse } from "next/server";
import { createAdminClient } from "@/libs/supabase";
import { validateAdmin } from "../auth";

export async function GET(request: Request) {
  const unauthorized = validateAdmin(request);
  if (unauthorized) return unauthorized;

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("main_category", { ascending: true })
    .order("sub_category", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const unauthorized = validateAdmin(request);
  if (unauthorized) return unauthorized;

  const supabase = createAdminClient();
  const body = await request.json();

  const { main_category, sub_category } = body;

  if (!main_category || typeof main_category !== "string") {
    return NextResponse.json({ error: "main_category must be a non-empty string" }, { status: 400 });
  }
  if (!sub_category || typeof sub_category !== "string") {
    return NextResponse.json({ error: "sub_category must be a non-empty string" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({
      main_category,
      sub_category,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
