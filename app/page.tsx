"use client";

import { useRouter } from "next/navigation";

export default function Hero() {

  const router = useRouter();

  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-[#0F2338] to-[#132E4A] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[800px] h-[800px] bg-yellow-500 opacity-10 blur-[200px] rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-10">

        <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 leading-tight">
          M500 Global Governance
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Federative digital governance network where communities
          coordinate globally and make decisions together.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">

          <button
            onClick={() => router.push("/dashboard")}
            className="px-10 py-5 text-xl font-bold bg-yellow-500 text-black rounded-2xl hover:scale-105 transition shadow-[0_0_40px_rgba(255,215,0,0.6)]"
          >
            🚀 Enter M500
          </button>

          <button
            onClick={() => router.push("/vision")}
            className="px-10 py-5 text-xl font-bold border-2 border-yellow-500 text-yellow-400 rounded-2xl hover:bg-yellow-500 hover:text-black transition"
          >
            🌍 What is M500
          </button>
          {/* SPONSOR CONTACT */}

<div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-[#132E4A] to-[#0F2338] border border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.2)] text-center space-y-4">

  <h2 className="text-3xl font-bold text-yellow-400">
    📢 Sponsorship & Advertising
  </h2>

  <p className="text-gray-300 max-w-2xl mx-auto">
    M500 ekosisteminde reklam ve sponsorluk fırsatları için bizimle iletişime geçebilirsiniz.
  </p>

  <div className="text-xl font-semibold text-white">
    📩 Contact: 
    <span className="text-yellow-400 ml-2">
      M500S@outlook.com.tr
    </span>
  </div>

</div>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-10 pt-10 text-center">

          <div>
            <div className="text-3xl font-bold text-yellow-400">1+</div>
            <div className="text-gray-400">Countries</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-yellow-400">100+</div>
            <div className="text-gray-400">Citizens</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-yellow-400">∞</div>
            <div className="text-gray-400">Global Vision</div>
          </div>

        </div>

      </div>
       
    </div>
  );
}