import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("assignments")
    .select("id, subject, class_name, due_date, file_url")
    .order("id", { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const mapped = (data || []).map((row: any) => ({
    _id: String(row.id),
    subject: row.subject,
    className: row.class_name,
    dueDate: row.due_date,
    fileUrl: row.file_url,
  }));

  return NextResponse.json(mapped, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const subject = String(form.get("subject") || "");
    const className = String(form.get("className") || "");
    const dueDate = String(form.get("dueDate") || "");

    if (!file) {
      return NextResponse.json({ message: "File is required" }, { status: 400 });
    }

    // Generate unique file name automatically
    const ext = file.name.split(".").pop() || "pdf";
    const timestamp = Date.now();
    const randomKey = Math.random().toString(36).substring(2, 8);
    const fileName = `${timestamp}-${randomKey}.${ext}`;
    const path = `uploads/${fileName}`;

    // Upload file directly to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("assignments")
      .upload(path, file, {
        contentType: file.type || "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ message: uploadError.message }, { status: 500 });
    }

    // Get public file URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("assignments").getPublicUrl(path);

    // Insert metadata into database
    const { data: inserted, error: insertError } = await supabase
      .from("assignments")
      .insert({
        subject,
        class_name: className,
        due_date: dueDate,
        file_url: publicUrl,
      })
      .select("id, subject, class_name, due_date, file_url")
      .single();

    if (insertError) {
      return NextResponse.json({ message: insertError.message }, { status: 500 });
    }

    const responseBody = {
      _id: String(inserted.id),
      subject: inserted.subject,
      className: inserted.class_name,
      dueDate: inserted.due_date,
      fileUrl: inserted.file_url,
    };

    return NextResponse.json(responseBody, { status: 201 });
  } catch (e: any) {
    console.error("Upload failed:", e);
    return NextResponse.json({ message: e?.message || "Unexpected error" }, { status: 500 });
  }
}



