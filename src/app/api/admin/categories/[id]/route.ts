import { NextResponse } from "next/server";
import { createAdminClient } from "@/libs/supabase";
import { validateAdmin } from "../../auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = validateAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const supabase = createAdminClient();
  const body = await request.json();

  const { main_category, sub_category } = body;

  if (main_category !== undefined && (typeof main_category !== "string" || main_category.trim() === "")) {
    return NextResponse.json({ error: "main_category must be a non-empty string" }, { status: 400 });
  }
  if (sub_category !== undefined && (typeof sub_category !== "string" || sub_category.trim() === "")) {
    return NextResponse.json({ error: "sub_category must be a non-empty string" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (main_category !== undefined) updates.main_category = main_category;
  if (sub_category !== undefined) updates.sub_category = sub_category;

  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
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
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
