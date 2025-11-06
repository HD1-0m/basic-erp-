// src/app/api/assignments/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

// server-side Supabase client (use service role key for full DB access)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// web-push VAPID data
const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY!;

webpush.setVapidDetails(
  "mailto:admin@your-erp.com",
  VAPID_PUBLIC,
  VAPID_PRIVATE
);

export async function POST(req: Request) {
  try {
    // parse incoming FormData
    const data = await req.formData();
    const file = data.get("file") as File | null;
    const title = (data.get("title") as string) || "New Assignment";
    const description = (data.get("description") as string) || "";
    const className = (data.get("className") as string) || null;

    if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });
    if (!className) return NextResponse.json({ error: "className required" }, { status: 400 });

    // read file bytes
    const buf = Buffer.from(await file.arrayBuffer());
    const fileExt = (file.name?.split(".").pop() || "pdf").toLowerCase();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
    const storagePath = `teacher_uploads/${fileName}`;

    // Upload to Supabase Storage bucket "assignments"
    const { error: uploadError } = await supabaseAdmin.storage
      .from("assignments")
      .upload(storagePath, buf, {
        contentType: file.type || "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL (if bucket is public) or create signed URL for private bucket
    // If private bucket, use createSignedUrl; public users can directly use public URL.
    const { data: publicUrlData } = supabaseAdmin.storage
      .from("assignments")
      .getPublicUrl(storagePath);

    const fileUrl = publicUrlData?.publicUrl ?? null;

    // insert assignment row
    const { data: assignmentRow, error: insertError } = await supabaseAdmin
      .from("assignments")
      .insert({
        title,
        description,
        class_name: className,
        file_path: storagePath,
        file_url: fileUrl,
        uploaded_by: null, // optionally set teacher id (if you can get it)
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert assignment error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Send push notifications to students of this class
    // fetch subscriptions
    const { data: subs, error: subsError } = await supabaseAdmin
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth_key")
      .eq("class_name", className);

    if (subsError) {
      console.error("Failed to fetch subscriptions:", subsError);
    } else if (subs && subs.length) {
      const payload = JSON.stringify({
        title: "📘 New Assignment",
        body: `${title} — Check assignments.`,
        url: `/assignments`, // optional, you can include a URL to open on click
      });

      // send to each subscription
      for (const s of subs) {
        const subscription = {
          endpoint: s.endpoint,
          keys: { p256dh: s.p256dh, auth: s.auth_key },
        };
        try {
          await webpush.sendNotification(subscription, payload);
        } catch (err) {
          console.error("Push error for endpoint", s.endpoint, err);
        }
      }
    }

    return NextResponse.json({ success: true, assignment: assignmentRow });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "unknown" }, { status: 500 });
  }
}
