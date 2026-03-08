"use client";

export default function WhatIsM500() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F2338] to-[#132E4A] text-white">

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">

        {/* HERO */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-yellow-400">
            What is M500?
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            M500 is a federative digital governance network where members
            collectively decide how value, influence and community resources
            are managed.
          </p>
        </div>

        {/* SECTION 1 */}
        <section className="grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-yellow-400">
              A New Governance Model
            </h2>

            <p className="text-gray-300">
              M500 introduces a new coordination structure where power flows
              from the community upward.
            </p>

            <p className="text-gray-400">
              Members vote on proposals, discuss ideas and collectively
              shape the direction of the network.
            </p>
          </div>

          <div className="p-10 bg-[#0B1C2D] rounded-2xl border border-yellow-500 text-center">
            👥 Citizens  
            <br />
            ↓  
            🏛 Local Councils  
            <br />
            ↓  
            🌍 Global Governance
          </div>

        </section>

        {/* SECTION 2 */}
        <section className="grid md:grid-cols-2 gap-12 items-center">

          <div className="p-10 bg-[#0B1C2D] rounded-2xl border border-purple-500 text-center">
            💰 Sponsorship  
            <br />
            💬 Social Platforms  
            <br />
            📢 Community Growth  
            <br /><br />
            ↓
            <br />
            🗳 Community Vote
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-purple-400">
              The First Sharing Economy Governance
            </h2>

            <p className="text-gray-300">
              M500 introduces a new model where sponsorship and media revenue
              can be collectively governed by the community.
            </p>

            <p className="text-gray-400">
              Members decide which sponsors are accepted and how resources
              should be used through transparent voting.
            </p>
          </div>

        </section>

        {/* SECTION 3 */}
        <section className="space-y-10">

          <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-400">
              M500 Token Structure
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            {/* M500 */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-[#0B1C2D] to-[#102A45] border border-yellow-500 space-y-4">

              <h3 className="text-2xl font-bold text-yellow-400">
                🪙 M500
              </h3>

              <p className="text-gray-300">
                Max Supply: 21,000,000
              </p>

              <p className="text-gray-400">
                A scarce digital asset designed for long-term ecosystem value
                and global network coordination.
              </p>

            </div>

            {/* M500v1 */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-[#0B1C2D] to-[#102A45] border border-purple-500 space-y-4">

              <h3 className="text-2xl font-bold text-purple-400">
                🏛 M500v1
              </h3>

              <p className="text-gray-300">
                Total Supply: 1,000,000,000
              </p>

              <p className="text-gray-400">
                Governance token used for participation, voting and community
                decision making.
              </p>

            </div>

          </div>

        </section>

        {/* SECTION 4 */}
        <section className="text-center space-y-6">

          <h2 className="text-3xl font-bold text-yellow-400">
            The Vision
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto">
            M500 aims to build a global digital governance network where
            communities collaborate, coordinate and collectively shape the
            future of digital society.
          </p>

        </section>

      </div>

    </div>
  );
}