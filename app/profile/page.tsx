"use client";

import { useEffect, useState } from "react";
import { usePhantom } from "@/lib/usePhantom";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { wallet, connect } = usePhantom();

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    country: "",
    education: "",
    occupation: "",
    bio: "",
  });

  useEffect(() => {
    if (!wallet) return;

    loadProfile();
  }, [wallet]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("wallet", wallet)
      .maybeSingle();

    if (data) {
      setForm({
        full_name: data.full_name || "",
        country: data.country || "",
        education: data.education || "",
        occupation: data.occupation || "",
        bio: data.bio || "",
      });
    }
  };

  const saveProfile = async () => {
  if (!wallet) return;

  setLoading(true);
  setSaved(false);

  const { error } = await supabase
    .from("profiles")
    .upsert({
      wallet,
      ...form,
    });

  if (error) {
    console.error("PROFILE SAVE ERROR:", error);
    alert("Profile save failed");
  } else {
    setSaved(true);
  }

  setLoading(false);
};

  if (!wallet) {
    return (
      <div className="p-20 text-center text-white">
        <button
          onClick={connect}
          className="px-8 py-4 bg-yellow-500 text-black rounded-xl font-bold"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-white space-y-10">

      <h1 className="text-3xl font-bold text-yellow-400">
        👤 My Profile
      </h1>

      <div className="space-y-6 bg-[#132E4A] p-8 rounded-3xl border border-yellow-600 shadow-[0_0_20px_rgba(255,215,0,0.2)]">

        <input
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
          className="w-full bg-black border border-gray-700 px-4 py-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Country"
          value={form.country}
          onChange={(e) =>
            setForm({ ...form, country: e.target.value })
          }
          className="w-full bg-black border border-gray-700 px-4 py-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Education"
          value={form.education}
          onChange={(e) =>
            setForm({ ...form, education: e.target.value })
          }
          className="w-full bg-black border border-gray-700 px-4 py-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Occupation"
          value={form.occupation}
          onChange={(e) =>
            setForm({ ...form, occupation: e.target.value })
          }
          className="w-full bg-black border border-gray-700 px-4 py-3 rounded-xl"
        />

        <textarea
          placeholder="Short Bio"
          value={form.bio}
          onChange={(e) =>
            setForm({ ...form, bio: e.target.value })
          }
          className="w-full bg-black border border-gray-700 px-4 py-3 rounded-xl h-28"
        />

        <button
          onClick={saveProfile}
          disabled={loading}
          className="w-full py-4 bg-yellow-500 text-black font-bold rounded-xl hover:scale-105 transition"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

        {saved && (
          <div className="text-green-400 text-center">
            ✅ Profile Updated
          </div>
        )}

      </div>
    </div>
  );
}