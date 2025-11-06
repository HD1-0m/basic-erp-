"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from("assignments").select("*");
      if (error) {
        console.error(error);
        setError(error.message || "Failed to load assignments");
        setAssignments([]);
      } else {
        setAssignments(data || []);
      }
      setLoading(false);
    };
    fetchAssignments();
  }, []);

  return (
    <div className="p-6 bg-white rounded-md shadow max-w-3xl mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Assignments</h1>
      {loading && (
        <div className="text-gray-600">Loading assignments…</div>
      )}
      {error && (
        <div className="text-red-600">{error}</div>
      )}
      {!loading && !error && (
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Subject</th>
            <th className="p-2">Class</th>
            <th className="p-2">Due Date</th>
            <th className="p-2">File</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length === 0 && (
            <tr>
              <td className="p-4 text-gray-600" colSpan={4}>No assignments found.</td>
            </tr>
          )}
          {assignments.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.subject}</td>
              <td className="p-2">{a.class_name}</td>
              <td className="p-2">{a.due_date}</td>
              <td className="p-2">
                <a
                  href={a.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}
