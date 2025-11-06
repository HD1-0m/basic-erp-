import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/mongodb";
import Assignment from "@/models/Assignment";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;
  const subject = data.get("subject") as string;
  const className = data.get("className") as string;
  const dueDate = data.get("dueDate") as string;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  // Save file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  // Save to MongoDB
  await connectDB();
  const assignment = await Assignment.create({
    subject,
    className,
    dueDate,
    fileUrl: `/uploads/${file.name}`,
    uploadedAt: new Date(),
  });

  return NextResponse.json(assignment);
}

export async function GET() {
  await connectDB();
  const assignments = await Assignment.find().sort({ uploadedAt: -1 });
  return NextResponse.json(assignments);
}

