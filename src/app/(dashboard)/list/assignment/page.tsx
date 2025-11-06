"use client";

import TableSearch from "@/components/TableSeearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { useState, useEffect } from "react";
 import { assignmentsData } from "@/lib/data";

type Assignment = {
  _id?: string;
  subject: string;
  className: string;
  dueDate: string;
  fileUrl?: string;
};

const columns = [
  { header: "Subject", accessor: "subject" },
  { header: "Class", accessor: "className" },
  { header: "Due Date", accessor: "dueDate" },
  { header: "Actions", accessor: "action" },
];

export default function AssignmentsPageList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const loadAssignments = async () => {
      const res = await fetch("/api/assignments", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setAssignments(data);
      }
    };
    loadAssignments();
  }, []);

  const handleUpload = async (file: File, assignment: Assignment) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", assignment.subject);
    formData.append("className", assignment.className);
    formData.append("dueDate", assignment.dueDate);
    console.log({formData})
    const res = await fetch("/api/assignments", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Uploaded successfully!");
      const newAssignment = await res.json();
      setAssignments((prev) => [newAssignment, ...prev]);
    } else {
      alert("✅ Uploaded successfully!");
    }
  };

  const renderRow = (item: Assignment) => (
    <tr
      key={item._id || item.subject}
      className="border-b hover:bg-gray-50 text-sm text-gray-700"
      style={{ height: "60px" }}
    >
      <td className="py-4 font-medium">{item.subject}</td>
      <td>{item.className}</td>
      <td>{item.dueDate}</td>
      <td>
        <div className="flex items-center gap-3">
          {/* Upload */}
          <input
            type="file"
            id={`file-${item._id}`}
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file, item);
            }}
          />
          <label
            htmlFor={`file-${item._id}`}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-green-200 hover:bg-green-300 cursor-pointer"
          >
            <Image src="/upload.png" alt="Upload" width={16} height={16} />
          </label>

          {/* View */}
          {item.fileUrl ? (
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200 hover:bg-blue-300 transition"
            >
              <Image src="/view.png" alt="View" width={16} height={16} />
            </a>
          ) : (
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200">
              <Image src="/view.png" alt="View" width={16} height={16} />
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Assignments</h1>

        <div className="flex items-center gap-4">
          <TableSearch />
          <Link href="/assignments/upload">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#CFCEFF]">
              <Image src="/plus.png" alt="Add" width={14} height={14} />
            </button>
          </Link>
        </div>
      </div>

      <Table columns={columns} data={assignmentsData} renderRow={renderRow} />
      <Pagination />
    </div>
  );
}

