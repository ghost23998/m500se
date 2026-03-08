"use client";

type Props = {
  name: string;
  vote: string;
  commission?: number;
  apy?: number;
  description?: string;
};

export default function ValidatorCard({
  name,
  vote,
  commission,
  apy,
  description,
}: Props) {
  return (
    <div className="
      relative
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-2xl
      p-6
      transition-all
      duration-300
      hover:scale-[1.02]
      hover:border-[#38bdf8]/50
      hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]
    ">

      {/* Neon glow background */}
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="relative z-10">

        {/* Title */}
        <h3 className="text-xl font-semibold text-white">
          {name}
        </h3>

        {/* Vote Address */}
        <p className="mt-2 text-sm text-gray-400 break-all">
          {vote}
        </p>

        {/* Stats */}
        <div className="mt-4 flex gap-6 text-sm text-gray-300">
          {commission !== undefined && (
            <div>
              <span className="text-gray-500">Commission</span><br />
              {commission}%
            </div>
          )}

          {apy !== undefined && (
            <div>
              <span className="text-gray-500">Est. APY</span><br />
              {apy}%
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            {description}
          </p>
        )}

        {/* Stake Button */}
        <a
          href={`https://solscan.io/validator/${vote}?cluster=mainnet`}
          target="_blank"
          className="
            mt-6 inline-block
            px-6 py-3
            rounded-xl
            bg-gradient-to-r
            from-[#38bdf8]
            to-[#6366f1]
            text-black
            font-semibold
            transition
            hover:scale-105
            shadow-[0_0_25px_rgba(56,189,248,0.6)]
          "
        >
          Stake via Phantom
        </a>

      </div>
    </div>
  );
}