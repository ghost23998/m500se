"use client";

import { useEffect, useRef } from "react";

interface Props {
  citizenId: string;
  wallet: string;
  governancePower: number;
  joinDate: string;
}

export default function CitizenCard({
  citizenId,
  wallet,
  governancePower,
  joinDate,
}: Props) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/citizen.png";

    img.onload = () => {

      // 🔥 Orijinal çözünürlük
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const shortWallet =
        wallet.slice(0, 6) + "..." + wallet.slice(-4);

      ctx.font = "bold 48px Arial";
      ctx.fillStyle = "#00ffff";
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 20;
      ctx.fillText(citizenId, 250, 520);

      ctx.font = "26px Arial";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(shortWallet, 250, 580);
      ctx.fillText(joinDate, 250, 620);
      ctx.fillText("Power: " + governancePower, 250, 660);

      ctx.fillStyle = "#00ff88";
      ctx.shadowColor = "#00ff88";
      ctx.shadowBlur = 15;
      ctx.font = "bold 32px Arial";
      ctx.fillText("ACTIVE", 250, 720);
    };

  }, [citizenId, wallet, governancePower, joinDate]);

  return (
    <div className="flex justify-center mt-12 px-4">
      <canvas
        ref={canvasRef}
        className="
          w-full
          max-w-[350px]
          md:max-w-[420px]
          lg:max-w-[480px]
          h-auto
          rounded-2xl
          shadow-[0_0_40px_rgba(0,255,255,0.3)]
        "
      />
    </div>
  );
}
