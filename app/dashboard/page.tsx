"use client";

import { useEffect, useState } from "react";
import { usePhantom } from "@/lib/usePhantom";
import { supabase } from "@/lib/supabase";
import { ADMIN_WALLET } from "@/lib/config";

export default function Home() {
  const { wallet, connect } = usePhantom();

  const [isCitizen, setIsCitizen] = useState(false);
  const [citizenId, setCitizenId] = useState<number | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    if (!wallet) return;
    checkCitizen();
    loadStats();
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
    } else {
      setIsCitizen(false);
      setCitizenId(null);
    }
  };

  const loadStats = async () => {
    const { data: votes } = await supabase
      .from("votes")
      .select("*")
      .eq("wallet", wallet);

    const { data: donations } = await supabase
      .from("sponsor_donations")
      .select("*")
      .eq("wallet", wallet);

    setTotalVotes(votes?.length || 0);

    const total =
      donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

    setTotalDonations(total);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-white space-y-16">

      {/* HEADER */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-yellow-400">
          🏛 M500 Elite Dashboard
        </h1>

        {wallet === ADMIN_WALLET && (
          <a
            href="/admin"
            className="inline-block mt-4 px-6 py-3 bg-purple-600 rounded-xl font-bold hover:scale-105 transition"
          >
            👑 Open Admin Panel
          </a>
        )}
      </div>

      {/* WALLET CONNECT */}
      {!wallet ? (
        <div className="text-center">
          <button
            onClick={connect}
            className="px-10 py-4 bg-yellow-500 text-black rounded-2xl font-bold hover:scale-105 transition"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          {/* DASHBOARD CARDS */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* WALLET */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#132E4A] to-[#0F2338] border border-yellow-600 space-y-4">
              <h2 className="text-lg text-gray-300">Wallet Address</h2>
              <div className="text-lg font-bold text-yellow-400 break-all">
                {wallet}
              </div>
            </div>

            {/* CITIZEN */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#132E4A] to-[#0F2338] border border-white/10 space-y-4">
              <h2 className="text-lg text-gray-300">Citizenship Status</h2>

              {isCitizen ? (
                <>
                  <div className="text-2xl font-bold text-green-400">
                    👑 Verified Citizen
                  </div>

                  {citizenId && (
                    <div className="text-yellow-400 font-bold text-lg">
                      Citizen ID: #{citizenId}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href="/become-citizen"
                  className="inline-block px-6 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:scale-105 transition"
                >
                  👑 Become Citizen
                </a>
              )}
            </div>

            {/* ACTIVITY */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#132E4A] to-[#0F2338] border border-white/10 space-y-6">
              <h2 className="text-lg text-gray-300">Activity Overview</h2>

              <div className="flex justify-between">
                <span>Votes Cast</span>
                <span className="font-bold text-yellow-400">
                  {totalVotes}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Donations</span>
                <span className="font-bold text-yellow-400">
                  {totalDonations.toFixed(2)} SOL
                </span>
              </div>
            </div>

          </div>

          {/* COMMUNITY SECTION */}
          <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-[#0B1C2D] to-[#132E4A] border border-yellow-500 shadow-[0_0_40px_rgba(255,215,0,0.2)] space-y-8">

            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-yellow-400">
                🌍 Join The M500 Community
              </h2>
              <p className="text-gray-400">
                Stay connected with the global governance network.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6">

              <a
                href="https://t.me/+vC5LLThOTbZhOWI0"
                target="_blank"
                className="px-8 py-4 bg-[#1F2937] hover:bg-[#0ea5e9] rounded-2xl font-semibold transition hover:scale-105"
              >
                📢 Telegram
              </a>

              <a
                href="https://x.com/100M500"
                target="_blank"
                className="px-8 py-4 bg-[#1F2937] hover:bg-black rounded-2xl font-semibold transition hover:scale-105"
              >
                🐦 X / Twitter
              </a>

              <a
                href="https://www.instagram.com/m500s2025"
                target="_blank"
                className="px-8 py-4 bg-[#1F2937] hover:bg-pink-600 rounded-2xl font-semibold transition hover:scale-105"
              >
                📸 Instagram
              </a>

              <a
                href="https://www.facebook.com/share/g/197B7yASmN/"
                target="_blank"
                className="px-8 py-4 bg-[#1F2937] hover:bg-blue-600 rounded-2xl font-semibold transition hover:scale-105"
              >
                👍 Facebook
              </a>

            </div>
          </div>

          {/* SECURITY WARNING */}
          <div className="mt-10 p-6 rounded-2xl border border-red-500 bg-[#1A0B0B] text-center space-y-3">

            <h3 className="text-lg font-bold text-red-400">
              ⚠ Security Notice
            </h3>

            <p className="text-gray-300 text-sm max-w-3xl mx-auto">
              M500 sizden asla özel mesaj yoluyla para veya kripto para talep etmez.
              Dolandırıcılara karşı dikkatli olun ve yalnızca resmi kanallarımızı kullanın.
              Asla private key veya seed phrase paylaşmayın.
            </p>

            <p className="text-gray-400 text-sm">
              Official Website:
              <span className="text-yellow-400 font-semibold ml-1">
                https://m500.com.tr
              </span>
            </p>
            <p className="text-gray-400 text-sm">
              Yardım mı Lazım ?  Bize Ulaşın = 
              <span className="text-yellow-400 font-semibold ml-1">
                M500S@outlook.com.tr
              </span>
            </p>

          </div>

        </>
      )}
    </div>
  );
}