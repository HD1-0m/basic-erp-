"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadAssignment() {
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    try {
      setLoading(true);
      const fileName = `${Date.now()}-${file.name}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("assignments")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public file URL
      const { data: urlData } = supabase.storage
        .from("assignments")
        .getPublicUrl(fileName);

      // Save metadata to Supabase Database
      const { error: dbError } = await supabase.from("assignments").insert({
        subject,
        class_name: className,
        due_date: dueDate,
        file_url: urlData.publicUrl,
      });

      if (dbError) throw dbError;

      alert("✅ Uploaded successfully!");
      setSubject("");
      setClassName("");
      setDueDate("");
      setFile(null);
    } catch (error: any) {
      console.error("Upload Error:", error);
      alert("❌ Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow max-w-md mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Upload Assignment</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>
    </div>
  );
}
