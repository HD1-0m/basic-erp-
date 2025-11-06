import Image from "next/image";

const TableSearch = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 border rounded-full p-2 bg-gray-50 w-full md:w-auto">
        <Image src="/search.png" alt="Search Icon" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm w-40"
        />
      </div>
    </div>
  );
};

export default TableSearch;
