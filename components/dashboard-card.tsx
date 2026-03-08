"use client";

import React from "react";

type BadgeType = "gold" | "blue" | "gray" | "danger";

type Props = {
  title: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  badge?: {
    label: string;
    type: BadgeType;
  };
  loading?: boolean;
  children?: React.ReactNode; // 👈 EKLENDİ
};

export default function DashboardCard({
  title,
  value,
  sub,
  highlight = false,
  badge,
  loading = false,
  children, // 👈 EKLENDİ
}: Props) {

  const badgeStyles: Record<BadgeType, string> = {
    gold: "bg-[#C6A75E]/15 text-[#C6A75E] border border-[#C6A75E]/40 shadow-[0_0_10px_rgba(198,167,94,0.25)]",
    blue: "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/40 shadow-[0_0_10px_rgba(59,130,246,0.25)]",
    gray: "bg-[#6B7280]/15 text-[#9CA3AF] border border-[#6B7280]/30",
danger: "bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/40 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse",
  };
   <h2 className="text-3xl font-semibold bg-gradient-to-r from-[#60A5FA] to-[#22D3EE] bg-clip-text text-transparent">
  M500 Dashboard
</h2>
  return (
   <div
  className={`
    relative
    bg-white/5
    backdrop-blur-xl
    border border-white/10
    rounded-2xl
    p-6
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:border-[#60A5FA]/50
    hover:shadow-[0_0_25px_rgba(96,165,250,0.3)]
  `}
>

      {/* Premium Rozet */}
      {badge && (
  <div
    className={`
      absolute top-4 right-4
      text-xs px-3 py-1 rounded-full
      font-semibold tracking-wide
      ${
        badge.type === "gold"
          ? "bg-[#C6A75E]/20 text-[#C6A75E] border border-[#C6A75E]/40"
          : badge.type === "danger"
          ? "bg-red-500/20 text-red-400 border border-red-500/40"
          : "bg-gray-500/20 text-gray-300"
      }
    `}
  >
    {badge.label}
  </div>
)}


      {/* Title */}
      <div className="text-sm text-[#9CA3AF] mb-2">
        {title}
      </div>

      {/* Value */}
      <div className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
        {loading ? (
          <div className="h-8 w-24 bg-[#2A2A33] animate-pulse rounded-md" />
        ) : (
          value
        )}
      </div>

      {/* Subtext */}
      {sub && (
        <div className="text-xs text-[#6B7280] mt-3">
          {sub}
        </div>
      )}

      {/* 👇 CHILDREN BURADA GÖRÜNECEK */}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}

    </div>
  );
}