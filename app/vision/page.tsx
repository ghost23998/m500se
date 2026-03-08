"use client";

import Image from "next/image";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F2338] to-[#132E4A] text-white">

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">

        {/* HERO – SADECE RESİM */}
        {/* HERO – FULL IMAGE NO ZOOM */}
<div className="w-full bg-[#0F2338] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)] p-6">

  <Image
    src="/vision/vision-hero.jpeg"
    alt="M500 Vision"
    width={1200}
    height={800}
    className="w-full h-auto object-contain rounded-2xl"
    priority
  />

</div>

        {/* Vision Header */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-semibold text-[#C6A75E]">
            Vizyonumuz
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-3xl mx-auto">
            Küresel, federatif ve üyeleri tarafından yönetilen
            dijital bir governance ağı.
          </p>
        </div>

        {/* CORE VISION */}
        <section className="space-y-8 text-[#B5B5C3] leading-relaxed">

          <div>
            <h3 className="text-2xl text-white font-medium">
              Yeni Bir Yönetişim Modeli
            </h3>
            <p>
              M500, merkezi otoriteye dayanmayan,
              şeffaf ve on-chain çalışan bir federatif governance modelidir.
            </p>
            <p>
              Güç yukarıdan aşağı değil, üyeden sisteme doğru akar.
              Her üye eşit oy hakkına sahiptir.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-white font-medium">
              Federatif Yapı
            </h3>
            <p>
              Her ülkede yerel M500 yapıları oluşur.
              Bu yapılar kendi konseylerini seçer,
              ancak ortak bir anayasal çerçeveye bağlı kalır.
            </p>
            <p>
              Yerel özgürlük ile küresel birlik dengelenir.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-white font-medium">
              Demokratik Güvence
            </h3>
            <p>
              Konsey üyeleri 3 yıllık süreyle seçilir.
              Üyeler gerekli gördüğünde görevden alma oylaması başlatabilir.
            </p>
            <p>
              Görevden alma için:
              %90 katılım ve %81 onay gereklidir.
            </p>
          </div>

        </section>

        {/* TOKENOMICS */}
        <section className="space-y-12">

          <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-400">
              🪙 M500 Token Economy
            </h2>
            <p className="text-gray-400">
              İki katmanlı ekonomik yapı
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            {/* MAIN COIN */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-[#0B1C2D] to-[#102A45] border border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.2)] space-y-6">
              <div className="text-2xl font-bold text-yellow-400">
                🏆 M500 (Main Coin)
              </div>
              <div className="space-y-2 text-gray-300">
                <p><strong>Max Supply:</strong> 21,000,000</p>
                <p><strong>Type:</strong> Scarce Value Asset</p>
                <p><strong>Purpose:</strong> Long-term value & reserve</p>
              </div>
            </div>

            {/* GOVERNANCE COIN */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-[#0B1C2D] to-[#102A45] border border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.2)] space-y-6">
              <div className="text-2xl font-bold text-purple-400">
                🏛 M500v1 (Governance Token)
              </div>
              <div className="space-y-2 text-gray-300">
                <p><strong>Total Supply:</strong> 1,000,000,000</p>
                <p><strong>Type:</strong> Governance Utility</p>
                <p><strong>Purpose:</strong> Voting & participation</p>
              </div>
            </div>

          </div>

        </section>

        {/* LONG TERM */}
        <section className="space-y-6 text-[#B5B5C3] leading-relaxed">
          <h3 className="text-2xl text-white font-medium">
            Uzun Vadeli Hedef
          </h3>
          <p>
            M500, 1.000.000 üyeye ulaşan küresel bir dijital governance
            ağı oluşturmayı hedefler.
          </p>
        </section>

        {/* FOOTER */}
        <div className="pt-12 border-t border-[#1F1F27] text-sm text-[#6B7280] text-center">
          M500 bir yatırım aracı değildir.
          Karar mekanizması tamamen kriptografik doğrulama ile çalışır.
        </div>

      </div>
    </div>
  );
}