import TableSearch from "@/components/TableSeearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { resultsData } from "@/lib/data";



type Result = {
  id: number;
  studentName: string;
  class: string;
  ooad: number;
  cn: number;
  os: number;
  ai: number;
};
const columns = [
  { header: "Student Name", accessor: "studentName" },
  { header: "Class", accessor: "class" },
  { header: "Subjects (OOAD | CN | OS | AI)", accessor: "subjects" },
  { header: "Total", accessor: "total" },
  { header: "Actions", accessor: "action" },
];

const ResultPageList = () => {
  const role = "admin";

  const renderRow = (item: Result) => {
    const total = item.ooad + item.cn + item.os + item.ai;

    return (
      <tr
        key={item.id}
        className="border-b hover:bg-gray-50 text-sm text-gray-700"
        style={{ height: "65px" }}
      >
        {/* Student Name */}
        <td className="py-4 font-medium text-gray-900">{item.studentName}</td>

        {/* Class */}
        <td className="text-gray-700">{item.class}</td>

        {/* Subjects grouped closely together */}
        <td>
          <div className="flex items-center gap-3 justify-start">
            <span className="px-2 py-1 bg-blue-50 rounded-md font-medium text-gray-700">
              OOAD: {item.ooad}
            </span>
            <span className="px-2 py-1 bg-blue-50 rounded-md font-medium text-gray-700">
              CN: {item.cn}
            </span>
            <span className="px-2 py-1 bg-blue-50 rounded-md font-medium text-gray-700">
              OS: {item.os}
            </span>
            <span className="px-2 py-1 bg-blue-50 rounded-md font-medium text-gray-700">
              AI: {item.ai}
            </span>
          </div>
        </td>

        {/* Total */}
        <td className="font-semibold text-gray-800 text-center">{total}</td>

        {/* Actions */}
        <td>
          <div className="flex items-center justify-center gap-3">
            {/* View */}
            <Link href={`/list/results/${item.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200 hover:bg-blue-300 transition">
                <Image src="/view.png" alt="View" width={16} height={16} />
              </button>
            </Link>

            {/* Delete (only for admin) */}
            {role === "admin" && (
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-200 hover:bg-purple-300 transition">
                <Image src="/delete.png" alt="Delete" width={16} height={16} />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Student Results</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            {/* Filter & Sort */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#CFCEFF]">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#CFCEFF]">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>

            {/* Add New Result */}
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#CFCEFF]">
                <Image src="/plus.png" alt="Add" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} data={resultsData} renderRow={renderRow} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default ResultPageList;

