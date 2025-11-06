import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
      {/* LEFT SIDE: SEARCH BAR */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 border rounded-full p-2 bg-gray-50">
          <Image src="/search.png" alt="Search Icon" width={14} height={14} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-40"
          />
        </div>
      </div>

      {/* RIGHT SIDE: ICONS AND USER */}
      <div className="flex items-center gap-4 md:gap-5">
        {/* Message Icon */}
        <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer shadow-sm">
          <Image src="/message.png" alt="Message Icon" width={20} height={20} />
        </div>

        {/* Announcement Icon with Badge */}
        <div className="relative bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer shadow-sm">
          <Image src="/announcement.png" alt="Announcement Icon" width={20} height={20} />
          <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-purple-500 text-white text-[10px] rounded-full">
            1
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium leading-3">Adivya</span>
          <span className="text-[10px] text-gray-500">Admin</span>
        </div>

        {/* Avatar */}
        <Image
          src="/avatar.png"
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
