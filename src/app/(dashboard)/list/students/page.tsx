import TableSearch from "@/components/TableSeearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { studentsData } from "@/lib/data";
import Table from "@/components/Table";
import Link from "next/link";


type Student = {
  id: number;
  Enrollement: string;
  name: string;
  email: string;
  photo: string;
  Grades: number;
  classes: string;
  phone: string;
  address: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Enrollement", accessor: "Enrollement" },
  { header: "Phone No", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Action", accessor: "action", className: "hidden lg:table-cell" },
];

const StudentPageList = () => {
  const role = "admin";

  const renderRow = (item: Student) => (
    <tr key={item.id} className="border-b hover:bg-gray-50 text-sm text-gray-700">
      <td className="flex items-center gap-4 py-2">
        <Image
          src={item.photo}
          alt={item.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.classes}</p>
        </div>
      </td>

      <td>{item.Enrollement}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>

      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/view.png" alt="view" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-200">
              <Image src="/delete.png" alt="delete" width={16} height={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#CFCEFF]">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#CFCEFF]">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#CFCEFF]">
                <Image src="/plus.png" alt="Add" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <Table columns={columns} data={studentsData} renderRow={renderRow} />
      <Pagination />
    </div>
  );
};

export default StudentPageList;
