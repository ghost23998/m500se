"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/" },
  { name: "M500 Investment", href: "/app" },
  { name: "Governance", href: "/vote" },
  { name: "Validators", href: "/validators" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0E0E11] border-r border-[#1C1C24] p-6 flex flex-col">
      
      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-2xl font-semibold text-[#C6A75E] tracking-wide">
          M500
        </h1>
        <p className="text-xs text-[#6E6E80] mt-1">
          Investment System
        </p>
      </div>

      {/* Menu */}
      <nav className="space-y-3 flex-1">
        {menu.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-md transition-all duration-200 text-sm
                ${
                  isActive
                    ? "bg-[#15151C] text-[#C6A75E]"
                    : "text-[#B5B5C3] hover:text-white hover:bg-[#15151C]"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="text-xs text-[#5C5C6A]">
        © {new Date().getFullYear()} M500
      </div>
    </aside>
  );
}
