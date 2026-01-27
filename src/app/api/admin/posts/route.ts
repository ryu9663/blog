import { NextResponse } from "next/server";
import { createAdminClient } from "@/libs/supabase";
import { validateAdmin } from "../auth";

export async function GET(request: Request) {
  const unauthorized = validateAdmin(request);
  if (unauthorized) return unauthorized;

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      category:categories(*),
      thumbnail:images(*)
    `
    )
    .order("created_at", { ascending: false });

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

  const { title, description, markdown, category_id, thumbnail_id, is_public, datocms_id } = body;

  // Input validation
  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "title must be a non-empty string" }, { status: 400 });
  }
  if (!markdown || typeof markdown !== "string") {
    return NextResponse.json({ error: "markdown must be a non-empty string" }, { status: 400 });
  }
  if (!category_id || typeof category_id !== "string") {
    return NextResponse.json({ error: "category_id must be a non-empty string" }, { status: 400 });
  }
  if (typeof is_public !== "boolean") {
    return NextResponse.json({ error: "is_public must be a boolean" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      description,
      markdown,
      category_id,
      thumbnail_id,
      is_public,
      datocms_id,
    })
    .select(
      `
      *,
      category:categories(*),
      thumbnail:images(*)
    `
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
