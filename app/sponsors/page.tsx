"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const TREASURY = "FyXrjSjTefUPQLX5vL4KfH2f8HrcdobhUePKUVVERwpZ";

export default function SponsorsPage() {

  const [amount, setAmount] = useState("0.1");
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const connection = new Connection(
    "https://mainnet.helius-rpc.com/?api-key=bb6e5f90-8964-4912-9748-a0a0ae32b2e2",
    "confirmed"
  );

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {

    const { data } = await supabase
      .from("sponsor_donations")
      .select("*")
      .order("amount", { ascending: false });

    if (data) {

      setDonations(data);

      const totalAmount = data.reduce(
        (sum, d) => sum + Number(d.amount),
        0
      );

      setTotal(totalAmount);
    }
  };

  const sendDonation = async () => {

    try {

      setLoading(true);

      const provider = (window as any).solana;

      if (!provider || !provider.isPhantom) {
        alert("Phantom wallet not installed");
        return;
      }

      // 👇 Wallet bağlı mı kontrol
      if (!provider.publicKey) {
        await provider.connect();
      }

      const wallet = provider.publicKey.toString();

      const lamports = Math.floor(
        parseFloat(amount) * LAMPORTS_PER_SOL
      );

      if (!lamports || lamports <= 0) {
        alert("Enter valid amount");
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(wallet),
          toPubkey: new PublicKey(TREASURY),
          lamports: lamports,
        })
      );

      transaction.feePayer = new PublicKey(wallet);

      const latest = await connection.getLatestBlockhash();

      transaction.recentBlockhash = latest.blockhash;

      // 👇 Phantom popup burada açılır
      const signed = await provider.signTransaction(transaction);

      const signature =
        await connection.sendRawTransaction(
          signed.serialize()
        );

      await connection.confirmTransaction(
        {
          signature,
          blockhash: latest.blockhash,
          lastValidBlockHeight:
            latest.lastValidBlockHeight
        },
        "confirmed"
      );

      const tx = await connection.getTransaction(
        signature,
        { commitment: "confirmed" }
      );

      if (!tx || tx.meta?.err) {
        alert("Transaction failed");
        return;
      }

      // 🔎 Wallet var mı kontrol
      const { data: existing } = await supabase
        .from("sponsor_donations")
        .select("*")
        .eq("wallet", wallet)
        .maybeSingle();

      if (existing) {

        const newAmount =
          Number(existing.amount) + Number(amount);

        await supabase
          .from("sponsor_donations")
          .update({
            amount: newAmount
          })
          .eq("wallet", wallet);

      } else {

        await supabase
          .from("sponsor_donations")
          .insert({
            wallet: wallet,
            amount: parseFloat(amount),
            tx_signature: signature
          });

      }

      alert(
        "💛 Donation successful!\n\nView on Solscan:\nhttps://solscan.io/tx/" +
          signature
      );

      loadDonations();

    } catch (err) {

      console.log(err);

      alert("Transaction failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-6xl mx-auto px-6 py-16 text-white space-y-16">

      <div className="text-center">

        <h1 className="text-4xl font-bold text-yellow-400">
          💛 Support M500
        </h1>

        <p className="text-gray-400">
          Total Raised: {total.toFixed(2)} SOL
        </p>

      </div>

      <div className="flex justify-center gap-4">

        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-black border border-gray-700 px-4 py-3 rounded-lg w-40"
        />

        <button
          onClick={sendDonation}
          disabled={loading}
          className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-xl"
        >
          {loading ? "Processing..." : "Donate"}
        </button>

      </div>

      <div className="space-y-4">

        <h2 className="text-2xl font-bold text-center">
          🏆 Top Sponsors
        </h2>

        {donations.map((d, i) => (

          <div
            key={i}
            className="flex justify-between bg-[#111] p-4 rounded-xl"
          >

            <span>
              {d.wallet.slice(0,6)}...{d.wallet.slice(-4)}
            </span>

            <span>
              {Number(d.amount).toFixed(2)} SOL
            </span>

          </div>
          

        ))}

      </div>
      <p className="text-gray-400 text-sm">
              Yatırdığınız miktar geçmedi mi
              Bize Ulaşın = ?
              <span className="text-yellow-400 font-semibold ml-1">
                 M500S@outlook.com.tr
              </span>
            </p>
    </div>
  );
}