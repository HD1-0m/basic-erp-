"use client";

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", path: "/", icon: "/home.png" },
  { title: "Students", path: "/list/students", icon: "/student.png",roles:["teacher","admin"] }, // ✅ fixed
  { title: "Teachers", path: "/list/teachers", icon: "/teacher.png",roles:["student","admin"] }, // ✅ fixed
  { title: "Classes", path: "/list/classes", icon: "/class.png",roles:["teacher","admin","student"] },     // ✅ optional if you add classes
  { title: "Assignement", path: "/list/assignment", icon: "/assignment.png" },
  { title: "Exams", path: "/exams", icon: "/exam.png" },
  { title: "Result", path: "/list/results", icon: "/result.png" },
  { title: "Attendance", path: "/list/Attendance", icon: "/attendance.png" },
  { title: "Settings", path: "/settings", icon: "/setting.png" },
];

const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 mt-8">
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        if (!item.visible || item.visible.includes(role)) {
          return (
            <Link
              key={item.title}
              href={item.path}
              className={`flex items-center gap-6 px-4 py-3 rounded-md cursor-pointer transition-colors duration-200 ${
                isActive
                  ? "bg-yellow-500 text-gray-900 font-semibold"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="hidden lg:block text-sm font-medium">
                {item.title}
              </span>
            </Link>
          );
        }

        return null;
      })}
    </div>
  );
};

export default Menu;




