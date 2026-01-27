import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createAdminClient } from "@/libs/supabase";
import { validateAdmin } from "../auth";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const unauthorized = validateAdmin(request);
  if (unauthorized) return unauthorized;

  const supabase = createAdminClient();
  const formData = await request.formData();

  const file = formData.get("file") as File | null;
  const alt = formData.get("alt") as string | null;
  const title = formData.get("title") as string | null;
  const widthStr = formData.get("width") as string | null;
  const heightStr = formData.get("height") as string | null;

  if (!file) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const width = widthStr ? parseInt(widthStr, 10) : null;
  const height = heightStr ? parseInt(heightStr, 10) : null;

  if ((widthStr && isNaN(width!)) || (heightStr && isNaN(height!))) {
    return NextResponse.json({ error: "Invalid width or height" }, { status: 400 });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileExt = file.name.split(".").pop() || "jpg";
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const s3Key = `uploads/${timestamp}-${random}.${fileExt}`;

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: s3Key,
    Body: fileBuffer,
    ContentType: file.type,
  });

  try {
    await s3Client.send(uploadCommand);
  } catch (error) {
    console.error("S3 upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }

  const { data, error: dbError } = await supabase
    .from("images")
    .insert({
      s3_key: s3Key,
      original_url: null,
      alt: alt || null,
      title: title || null,
      width,
      height,
      blur_data_url: null,
    })
    .select()
    .single();

  if (dbError) {
    return NextResponse.json(
      { error: dbError.message },
      { status: 500 }
    );
  }

  const cloudfrontUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/${s3Key}`;

  return NextResponse.json(
    { image: data, url: cloudfrontUrl },
    { status: 201 }
  );
}
