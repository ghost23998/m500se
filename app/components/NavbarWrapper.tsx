"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Landing sayfada navbar gizle
  if (pathname === "/") return null;

  return <Navbar />;
}