"use client";

import { useState } from "react";
import { usePhantom } from "@/lib/usePhantom";
import { supabase } from "@/lib/supabase";
import { ADMIN_WALLET } from "@/lib/config";

export default function AdminPage() {
  const { wallet, connect } = usePhantom();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!wallet) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <button
          onClick={connect}
          className="px-8 py-4 bg-yellow-500 text-black rounded-xl font-bold hover:scale-105 transition"
        >
          Connect Admin Wallet
        </button>
      </div>
    );
  }

  if (wallet !== ADMIN_WALLET) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-xl font-bold">
        ❌ Access Denied
      </div>
    );
  }

  const createProposal = async () => {
    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const endsAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      );

      const { error } = await supabase.from("proposals").insert({
        title,
        description,
        is_active: true,
        ends_at: endsAt.toISOString(),
      });

      if (error) {
        console.error(error);
        alert("Error creating proposal");
        return;
      }

      setTitle("");
      setDescription("");

      alert("🗳 Proposal Created (24h Active)");

    } catch (err) {
      console.error(err);
      alert("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-16 text-white">

      <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-[#132E4A] to-[#0F2338] border border-purple-600 shadow-[0_0_30px_rgba(147,51,234,0.3)] space-y-8">

        <h1 className="text-3xl font-bold text-purple-400">
          👑 Admin Governance Panel
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Proposal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black border border-gray-700 px-4 py-3 rounded-xl"
          />

          <textarea
            placeholder="Proposal Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black border border-gray-700 px-4 py-3 rounded-xl"
            rows={4}
          />

          <button
            onClick={createProposal}
            disabled={loading}
            className="w-full py-4 bg-purple-600 rounded-xl font-bold hover:scale-105 transition"
          >
            {loading
              ? "Creating..."
              : "🚀 Create 24h Proposal"}
          </button>

        </div>

      </div>

    </div>
  );
}