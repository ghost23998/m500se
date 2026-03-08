"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { usePhantom } from "@/lib/usePhantom";
import { ADMIN_WALLET } from "@/lib/config";

export default function GovernancePage() {
  const { wallet } = usePhantom();

  const [proposals, setProposals] = useState<any[]>([]);
  const [results, setResults] = useState<any>({});
  const [userVotes, setUserVotes] = useState<any>({});
  const [comments, setComments] = useState<any>({});
  const [newComment, setNewComment] = useState<any>({});
  const [totalCitizens, setTotalCitizens] = useState(0);

  useEffect(() => {
    loadProposals();
    loadCitizenCount();
  }, []);

  useEffect(() => {
    if (!wallet) return;
    proposals.forEach((p) => loadUserVote(p.id));
  }, [wallet, proposals]);

  const loadCitizenCount = async () => {
    const { count } = await supabase
      .from("citizens")
      .select("*", { count: "exact", head: true });

    setTotalCitizens(count || 0);
  };

  const loadProposals = async () => {
    const { data } = await supabase
      .from("proposals")
      .select("*")
      .eq("is_active", true);

    setProposals(data || []);

    if (data) {
      data.forEach((p) => {
        loadResults(p.id);
        loadComments(p.id);
      });
    }
  };

  const loadResults = async (proposalId: string) => {
    const { data } = await supabase
      .from("votes")
      .select("*")
      .eq("proposal_id", proposalId);

    const yes = data?.filter((v) => v.choice === "YES").length || 0;
    const no = data?.filter((v) => v.choice === "NO").length || 0;

    setResults((prev: any) => ({
      ...prev,
      [proposalId]: { yes, no },
    }));
  };

  const loadUserVote = async (proposalId: string) => {
    if (!wallet) return;

    const { data } = await supabase
      .from("votes")
      .select("choice")
      .eq("proposal_id", proposalId)
      .eq("wallet", wallet)
      .maybeSingle();

    if (data) {
      setUserVotes((prev: any) => ({
        ...prev,
        [proposalId]: data.choice,
      }));
    }
  };

  const loadComments = async (proposalId: string) => {
    const { data } = await supabase
      .from("comments")
      .select("*, citizens(citizen_id)")
      .eq("proposal_id", proposalId)
      .order("created_at", { ascending: false });

    setComments((prev: any) => ({
      ...prev,
      [proposalId]: data || [],
    }));
  };

  const signAndVote = async (proposalId: string, choice: string) => {
    if (!wallet) return alert("Connect wallet");

    const provider = (window as any).solana;
    const message = `M500 Vote:${proposalId}:${choice}`;
    const encodedMessage = new TextEncoder().encode(message);
    const signed = await provider.signMessage(encodedMessage, "utf8");

    const res = await fetch("/api/vote-secure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet,
        proposalId,
        choice,
        message,
        signature: Array.from(signed.signature),
      }),
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.error);
    } else {
      loadResults(proposalId);
      loadUserVote(proposalId);
    }
  };

  const signAndComment = async (proposalId: string, expired: boolean) => {
    if (!wallet) return alert("Connect wallet");
    if (expired) return;

    const content = newComment[proposalId];
    if (!content) return;

    const provider = (window as any).solana;
    const message = `M500_COMMENT_${proposalId}`;
    const encodedMessage = new TextEncoder().encode(message);
    const signed = await provider.signMessage(encodedMessage, "utf8");

    const res = await fetch("/api/comment-secure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet,
        proposalId,
        content,
        message,
        signature: Array.from(signed.signature),
      }),
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.error);
    } else {
      setNewComment((prev: any) => ({
        ...prev,
        [proposalId]: "",
      }));
      loadComments(proposalId);
    }
  };

  return (
    <div className="p-12 space-y-10">
      <h1 className="text-3xl font-bold text-yellow-400">
        🗳 M500 Governance
      </h1>

      {proposals.map((p) => {
        const yes = results[p.id]?.yes || 0;
        const no = results[p.id]?.no || 0;
        const total = yes + no;

        const yesPercent = total ? (yes / total) * 100 : 0;
        const noPercent = total ? (no / total) * 100 : 0;

        const participation = totalCitizens
          ? (total / totalCitizens) * 100
          : 0;

        const ends = new Date(p.ends_at);
        const expired = ends.getTime() - Date.now() <= 0;
        const votedChoice = userVotes[p.id];

        const status = expired
          ? yes > no
            ? "PASSED"
            : "REJECTED"
          : "ACTIVE";

        return (
          <div key={p.id} className="p-8 bg-[#132E4A] rounded-2xl space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{p.title}</h2>

              <div className={`px-4 py-1 rounded-full text-sm font-bold
                ${status === "PASSED"
                  ? "bg-green-600"
                  : status === "REJECTED"
                  ? "bg-red-600"
                  : "bg-yellow-600"
                }`}>
                {status}
              </div>
            </div>

            <p className="text-gray-400">{p.description}</p>

            {/* VOTE BUTTONS */}
            {!expired && (
              <div className="flex gap-4">
                <button
                  disabled={votedChoice}
                  onClick={() => signAndVote(p.id, "YES")}
                  className={`flex-1 py-3 rounded-xl font-bold transition
                  ${votedChoice === "YES"
                    ? "bg-green-800 opacity-60"
                    : "bg-green-600 hover:scale-105"}
                  disabled:opacity-40`}
                >
                  {votedChoice === "YES" ? "✔ YOU VOTED YES" : "YES"}
                </button>

                <button
                  disabled={votedChoice}
                  onClick={() => signAndVote(p.id, "NO")}
                  className={`flex-1 py-3 rounded-xl font-bold transition
                  ${votedChoice === "NO"
                    ? "bg-red-800 opacity-60"
                    : "bg-red-600 hover:scale-105"}
                  disabled:opacity-40`}
                >
                  {votedChoice === "NO" ? "✔ YOU VOTED NO" : "NO"}
                </button>
              </div>
            )}

            {/* PARTICIPATION */}
            <div className="text-sm text-gray-400">
              Participation: {participation.toFixed(1)}%
              ({total}/{totalCitizens})
            </div>

            {/* RESULT BARS */}
            {total > 0 && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">YES ({yes})</span>
                    <span className="text-green-400">{yesPercent.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-[#0B1C2D] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500"
                      style={{ width: `${yesPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-400">NO ({no})</span>
                    <span className="text-red-400">{noPercent.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-[#0B1C2D] rounded-full overflow-hidden">
                    <div className="h-full bg-red-500"
                      style={{ width: `${noPercent}%` }} />
                  </div>
                </div>
              </div>
            )}

            {/* COMMENTS */}
            <div className="border-t border-gray-700 pt-6 space-y-4">
              {comments[p.id]?.map((c: any) => (
                <div key={c.id} className="bg-[#0B1C2D] p-3 rounded-lg">
                  {c.wallet === ADMIN_WALLET
                    ? "👑 ADMIN"
                    : `ID #${c.citizens?.citizen_id}`}
                  <div>{c.content}</div>
                </div>
              ))}

              {!expired && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment[p.id] || ""}
                    onChange={(e) =>
                      setNewComment((prev: any) => ({
                        ...prev,
                        [p.id]: e.target.value,
                      }))
                    }
                    className="flex-1 bg-black px-3 py-2 rounded-lg"
                  />
                  <button
                    onClick={() => signAndComment(p.id, expired)}
                    className="px-4 bg-yellow-500 text-black rounded-lg"
                  >
                    Post
                  </button>
                </div>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}