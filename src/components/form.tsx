"use client";
import { useState } from "react";

export default function AssignmentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [className, setClassName] = useState("IT-A");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return alert("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("className", className);

    const res = await fetch("/api/assignments", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Assignment title"
      />
      <select
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      >
        <option value="IT-A">IT-A</option>
        <option value="IT-B">IT-B</option>
      </select>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}
