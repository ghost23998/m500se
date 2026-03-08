"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Topbar() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      try {
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
      } catch (err) {
        console.error("Balance error:", err);
      }
    };

    fetchBalance();
  }, [publicKey, connection]);

  const shortAddress = publicKey
    ? publicKey.toBase58().slice(0, 4) +
      "..." +
      publicKey.toBase58().slice(-4)
    : null;

  return (
    <header className="h-16 border-b border-[#1C1C24] bg-[#0B0B0F] flex items-center justify-between px-8">
      
      <div className="text-sm text-[#B5B5C3]">
        M500 Dashboard
      </div>

      <div className="flex items-center gap-6">

        {balance !== null && (
          <div className="text-sm text-white">
            {balance.toFixed(2)} SOL
          </div>
        )}

        {shortAddress && (
          <div className="text-sm text-[#C6A75E]">
            {shortAddress}
          </div>
        )}

        <WalletMultiButton className="!bg-[#C6A75E] !text-black !rounded-md" />

      </div>
    </header>
  );
}
