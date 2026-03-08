"use client";

import { useEffect, useState } from "react";
import { supabase } from "lib/supabase";
import Link from "next/link";

export default function ActiveBanner() {
  const [activeVote, setActiveVote] = useState<any>(null);

  useEffect(() => {
    const fetchActiveVote = async () => {
      const { data } = await supabase
        .from("votes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data && Date.now() < data.end_time) {
        setActiveVote(data);
      }
    };

    fetchActiveVote();
  }, []);

  if (!activeVote) return null;

  const remaining =
    Math.max(0, activeVote.end_time - Date.now());

  const hours = Math.floor(remaining / (1000 * 60 * 60));

  return (
    <Link href="/vote" className="block">
      <div className="bg-[#121218] border border-[#1F1F27] rounded-2xl p-6 transition hover:border-[#C6A75E]/40 hover:bg-[#15151C]">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs tracking-wide text-[#C6A75E] mb-1">
              ACTIVE PROPOSAL
            </p>

            <h3 className="text-white font-medium text-lg">
              {activeVote.question}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-xs text-[#8E8EA0]">
              Ends in
            </p>
            <p className="text-xl font-semibold text-white">
              {hours}h
            </p>
          </div>

        </div>

      </div>
    </Link>
  );
}
