"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePhantom } from "@/lib/usePhantom";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { wallet, connect, disconnect } = usePhantom();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const linkClass = (path: string) =>
    `px-5 py-2 rounded-xl transition ${
      pathname === path
        ? "bg-white/10 text-yellow-400"
        : "hover:bg-white/5 text-gray-300"
    }`;

  // Outside click close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDisconnect = async () => {
  try {
    if ((window as any).solana?.isConnected) {
      await (window as any).solana.disconnect();
    }

    localStorage.clear(); // wallet adapter cache temizle
    setOpen(false);

    window.location.href = "/"; // temiz state ile dön
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="backdrop-blur-md bg-[#0F2338]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* LEFT SIDE – LOGO */}
        <Link href="/" className="flex items-center gap-4">
          <div className="w-[80px] h-[80px] rounded-full border-2 border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.8)] flex items-center justify-center bg-[#0F2338]">
            <Image
              src="/logo/m500-gold.png"
              alt="M500 Emblem"
              width={74}
              height={74}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[10px] text-gray-400 tracking-widest">
  FEDERATIVE DIGITAL GOVERNANCE
</span>
            <span className="text-[10px] text-gray-400 tracking-widest">
              M500
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <div className="flex gap-3 items-center">

  <Link href="/" className={linkClass("/")}>
    Home
  </Link>

  <Link href="/vision" className={linkClass("/vision")}>
    Vision
  </Link>

  <Link href="/governance" className={linkClass("/governance")}>
    Governance
  </Link>

  <Link href="/constitution" className={linkClass("/constitution")}>
    Constitution
  </Link>

  <Link href="/sponsors" className={linkClass("/sponsors")}>
    Sponsors
  </Link>

  <Link href="/dashboard" className={linkClass("/dashboard")}>
    Dashboard
  </Link>

</div>
       
        {/* WALLET */}
        <div className="relative" ref={menuRef}>
          {!wallet ? (
            <button
              onClick={connect}
              className="px-6 py-2 bg-yellow-500 text-black rounded-xl font-semibold hover:scale-105 transition"
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center gap-2 px-6 py-2 bg-yellow-400 text-black rounded-xl font-bold shadow-lg hover:scale-105 transition"
              >
                <Image
                  src="/logo/m500-gold.png"
                  alt="Wallet Badge"
                  width={18}
                  height={18}
                />
                {wallet.slice(0, 6)}...{wallet.slice(-4)}
              </div>

              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0F2338] border border-yellow-500 rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.25)] overflow-hidden z-50">

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(wallet);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 text-gray-300"
                  >
                    📋 Copy Address
                  </button>

                  <Link
  href="/profile"
  onClick={() => setOpen(false)}
  className="block px-4 py-3 hover:bg-white/5 text-gray-300"
>
  👤 My Profile
</Link>

                  <button
  onClick={disconnect}
  className="w-full text-left px-4 py-3 hover:bg-red-600/20 text-red-400"
>
  🔌 Disconnect
</button>

                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}