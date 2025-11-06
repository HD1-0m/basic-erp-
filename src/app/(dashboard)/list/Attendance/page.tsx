"use client";

import Image from "next/image";
import { useState } from "react";
import { studentsData } from "@/lib/data"; // reuse your students list

interface Subject {
  id: number;
  name: string;
}

const subjects: Subject[] = [
  { id: 1, name: "CN" },
  { id: 2, name: "AdJava" },
  { id: 3, name: "OOAD" },
  { id: 4, name: "OS" },
  { id: 5, name: "AI" },
];

const AttendanceDashboard = () => {
  // attendance[studentId][subjectId] = "Present" | "Absent"
  const [attendance, setAttendance] = useState<Record<number, Record<number, string>>>({});

  const handleAttendance = (studentId: number, subjectId: number, status: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subjectId]: status,
      },
    }));
  };

  const handleSubmit = () => {
    console.log("Attendance Data:", attendance);
    alert("✅ Attendance Submitted Successfully!");
  };

  const handleRefresh = () => {
    setAttendance({});
    alert("🔄 Attendance data refreshed!");
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 overflow-x-auto">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">📋 Attendance Dashboard</h1>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow transition"
        >
          <Image src="/refresh.png" alt="Refresh" width={16} height={16} />
          Refresh Attendance
        </button>
      </div>

      {/* Attendance Table */}
      <table className="w-full border border-gray-200 rounded-lg text-sm text-gray-700">
        <thead>
          <tr className="bg-blue-50 border-b">
            <th className="p-3 text-left">Student</th>
            {subjects.map((subject) => (
              <th key={subject.id} className="p-3 text-center">
                {subject.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student: any) => (
            <tr key={student.id} className="border-b hover:bg-gray-50">
              {/* Student Info */}
              <td className="flex items-center gap-3 p-3">
                <Image
                  src={student.photo}
                  alt={student.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.classes}</p>
                </div>
              </td>

              {/* Subject Attendance */}
              {subjects.map((subject) => (
                <td key={subject.id} className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleAttendance(student.id, subject.id, "Present")}
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        attendance[student.id]?.[subject.id] === "Present"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      P
                    </button>
                    <button
                      onClick={() => handleAttendance(student.id, subject.id, "Absent")}
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        attendance[student.id]?.[subject.id] === "Absent"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      A
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Submit Button */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow transition"
        >
          Submit Attendance
        </button>

        <button
          onClick={handleRefresh}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 shadow transition"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default AttendanceDashboard;

