"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItem = (href: string, label: string) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`
          block px-4 py-3 rounded-xl text-sm transition-all duration-200
          ${active
            ? "bg-[#1F1F27] text-white border border-[#C6A75E]/40"
            : "text-[#8E8EA0] hover:text-white hover:bg-[#1F1F27]"
          }
        `}
      >
        {label}
      </Link>
    );
  };

  return (
    <aside className="w-64 h-screen bg-[#0F0F14] border-r border-[#1C1C24] p-6 flex flex-col">

      {/* Logo / Title */}
      <div className="mb-10">
        <h1 className="text-xl font-semibold text-[#C6A75E]">
          M500
        </h1>
        <p className="text-xs text-[#6B7280] mt-1">
          Governance Dashboard
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-3">

        {navItem("/", "Dashboard")}
        {navItem("/vote", "Governance")}
        {navItem("/validators", "Validators")}
        {navItem("/privacy", "Privacy Policy")}
        {navItem("/terms", "Terms of Use")}
        {navItem("/vision", "Vizyonumuz")}
        {navItem("/proposals", "Proposals")}
        {navItem("/become-citizen", "Become Citizen")}

      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer Section */}
      <div className="flex flex-col gap-3 pt-6 border-t border-[#1C1C24]">

        {navItem("/legal", "Legal Disclaimer")}

        <p className="text-xs text-[#6B7280] mt-4">
          © {new Date().getFullYear()} M500
        </p>

      </div>

    </aside>
  );
}
