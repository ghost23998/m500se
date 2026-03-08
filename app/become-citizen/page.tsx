"use client";

import { useEffect, useState } from "react";
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
  const [citizenId, setCitizenId] = useState<number | null>(null);

  useEffect(() => {
    if (!wallet) return;
    checkCitizen();
  }, [wallet]);

  const checkCitizen = async () => {
    const { data } = await supabase
      .from("citizens")
      .select("*")
      .eq("wallet", wallet)
      .maybeSingle();

    if (data) {
      setIsCitizen(true);
      setCitizenId(data.citizen_id);
    }
  };

  // 🔥 RANDOM + UNIQUE ID
  const generateCitizenId = async (): Promise<number> => {
    while (true) {
      const randomId = Math.floor(Math.random() * 1000000) + 1;

      const { data } = await supabase
        .from("citizens")
        .select("citizen_id")
        .eq("citizen_id", randomId)
        .maybeSingle();

      if (!data) {
        return randomId;
      }
    }
  };

  const handlePayment = async () => {
    if (!wallet || loading || isCitizen) return;

    try {
      setLoading(true);

      const provider = (window as any).solana;
      if (!provider) {
        alert("Phantom not found");
        return;
      }

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

      // 🔥 ID üret
      const newCitizenId = await generateCitizenId();

      const { error } = await supabase.from("citizens").insert({
        wallet,
        citizen_id: newCitizenId,
      });

      if (error) {
        console.error("Insert error:", error);
        alert("Database error");
        return;
      }

      setCitizenId(newCitizenId);
      setIsCitizen(true);

      alert(`👑 Citizenship Activated! ID: ${newCitizenId}`);

    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="max-w-2xl w-full p-12 rounded-3xl bg-gradient-to-br from-[#132E4A] to-[#0F2338] border border-yellow-600 shadow-[0_0_40px_rgba(255,215,0,0.2)] space-y-8 text-center">

        <h1 className="text-4xl font-bold text-yellow-400">
          👑 Activate M500 Citizenship
        </h1>

        {!wallet ? (
          <button
            onClick={connect}
            className="px-10 py-4 bg-yellow-500 text-black rounded-2xl font-bold hover:scale-105 transition"
          >
            Connect Wallet
          </button>
        ) : !isCitizen ? (
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-5 text-xl font-bold rounded-2xl bg-yellow-500 text-black hover:scale-105 transition"
          >
            {loading ? "Processing..." : "Activate – 1 SOL"}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="text-green-400 text-2xl font-semibold">
              👑 You are an M500 Citizen
            </div>

            <div className="text-yellow-400 text-xl font-bold">
              Citizen ID: #{citizenId}
            </div>
          </div>
        )}
         <p className="text-gray-400 text-sm">
              Yatırdığınız miktar geçmedi mi
              Bize Ulaşın =  
              <span className="text-yellow-400 font-semibold ml-1">
                M500S@outlook.com.tr
              </span>
            </p>
      </div>
    </div>
  );
}