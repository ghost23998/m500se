"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Topbar() {
  const { publicKey } = useWallet();

  const shortAddress = publicKey
    ? publicKey.toBase58().slice(0, 4) +
      "..." +
      publicKey.toBase58().slice(-4)
    : null;

  return (
    <header className="h-16 border-b border-[#1C1C24] bg-[#0B0B0F] flex items-center justify-between px-8">
      
      {/* Left */}
      <div className="text-sm text-[#B5B5C3]">
        M500 Financial Dashboard
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        
        {publicKey && (
          <div className="text-sm text-[#C6A75E]">
            {shortAddress}
          </div>
        )}

        <WalletMultiButton className="!bg-[#C6A75E] !text-black !rounded-md hover:!opacity-90 transition-all" />
      </div>
    </header>
  );
}
