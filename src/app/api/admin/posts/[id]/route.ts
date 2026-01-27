import { NextResponse } from "next/server";
import { createAdminClient } from "@/libs/supabase";
import { validateAdmin } from "../../auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = validateAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
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
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = validateAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const supabase = createAdminClient();
  const body = await request.json();

  const { title, description, markdown, category_id, thumbnail_id, is_public, datocms_id } = body;

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return NextResponse.json({ error: "title must be a non-empty string" }, { status: 400 });
  }
  if (is_public !== undefined && typeof is_public !== "boolean") {
    return NextResponse.json({ error: "is_public must be a boolean" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (markdown !== undefined) updates.markdown = markdown;
  if (category_id !== undefined) updates.category_id = category_id;
  if (thumbnail_id !== undefined) updates.thumbnail_id = thumbnail_id;
  if (is_public !== undefined) updates.is_public = is_public;
  if (datocms_id !== undefined) updates.datocms_id = datocms_id;

  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", id)
    .select(
      `
      *,
      category:categories(*),
      thumbnail:images(*)
    `
    )
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = validateAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
