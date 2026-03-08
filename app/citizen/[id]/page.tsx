"use client";

import { useState, useEffect } from "react";
import { usePhantom } from "@/lib/usePhantom";
import { supabase } from "@/lib/supabase";
import { M500_TREASURY } from "@/lib/config";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export default function BecomeCitizenPage() {
  const { wallet, connect } = usePhantom();
  const [loading, setLoading] = useState(false);
  const [isCitizen, setIsCitizen] = useState(false);

  useEffect(() => {
    if (!wallet) return;

    const checkCitizen = async () => {
      const { data } = await supabase
        .from("citizens")
        .select("wallet")
        .eq("wallet", wallet)
        .maybeSingle();

      if (data) setIsCitizen(true);
    };

    checkCitizen();
  }, [wallet]);

  const handlePayment = async () => {
  if (!wallet || loading || isCitizen) return;

  try {
    setLoading(true);

    const provider = (window as any).solana;

    if (!provider || !provider.isPhantom) {
      alert("Phantom not found");
      return;
    }

    // 👇 Bu satır popup açar
    await provider.connect();

    const connection = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=bb6e5f90-8964-4912-9748-a0a0ae32b2e2",
  "confirmed"
);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(wallet),
        toPubkey: new PublicKey(M500_TREASURY),
        lamports: 1 * LAMPORTS_PER_SOL,
      })
    );

    transaction.feePayer = new PublicKey(wallet);
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const signed = await provider.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(
      signed.serialize()
    );

    await connection.confirmTransaction(signature);

    await supabase.from("citizens").insert({ wallet });

    setIsCitizen(true);
    alert("🎉 Citizenship Activated!");

  } catch (err) {
    console.log(err);
    alert("Transaction failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-12 text-white">

      {!wallet ? (
        <button
          onClick={connect}
          className="bg-purple-600 px-6 py-3 rounded-xl"
        >
          Connect Wallet
        </button>
      ) : !isCitizen ? (
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-5 text-xl font-bold rounded-2xl border-4 border-yellow-500 bg-yellow-400 text-black hover:scale-105 transition"
        >
          {loading
            ? "Processing..."
            : "👑 ACTIVATE CITIZENSHIP – 1 SOL"}
        </button>
      ) : (
        <div className="text-green-400 text-xl">
          👑 M500 CITIZEN
        </div>
      )}

    </div>
  );
}