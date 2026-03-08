"use client";

export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-white space-y-12">

      <h1 className="text-3xl font-semibold text-[#C6A75E]">
        Legal Notice, Terms & Privacy Policy
      </h1>

      {/* 1. Age Requirement */}
      <section className="space-y-4 text-[#B5B5C3] text-sm leading-relaxed">
        <h2 className="text-white text-lg font-medium">
          1. Age Requirement
        </h2>

        <p>
          M500 is strictly intended for individuals who are at least
          18 years old.
        </p>

        <p>
          By accessing or using this platform, you confirm that you are
          18 years of age or older and legally capable of entering
          binding agreements in your jurisdiction.
        </p>
      </section>

      {/* 2. Nature of Platform */}
      <section className="space-y-4 text-[#B5B5C3] text-sm leading-relaxed">
        <h2 className="text-white text-lg font-medium">
          2. Nature of the Platform
        </h2>

        <p>
          M500 is a decentralized governance interface built on the Solana blockchain.
          It is not a registered company, financial institution, or investment vehicle.
        </p>

        <p>
          Participation does not grant equity, ownership,
          profit-sharing rights, or securities.
        </p>
      </section>

      {/* 3. Citizenship Fee */}
      <section className="space-y-4 text-[#B5B5C3] text-sm leading-relaxed">
        <h2 className="text-white text-lg font-medium">
          3. Citizenship Activation
        </h2>

        <p>
          The 1 SOL activation fee is a voluntary blockchain transaction
          granting access to governance participation.
        </p>

        <p>
          All blockchain payments are final and non-refundable.
        </p>
      </section>

      {/* 4. Self Custody */}
      <section className="space-y-4 text-[#B5B5C3] text-sm leading-relaxed">
        <h2 className="text-white text-lg font-medium">
          4. Wallet Security & Self-Custody
        </h2>

        <p>
          Users are solely responsible for safeguarding their wallet,
          private keys, seed phrases, and access credentials.
        </p>

        <p>
          M500 does not store private keys and cannot recover lost wallets.
        </p>
      </section>

      {/* 5. Profile Information */}
      <section className="space-y-4 text-[#B5B5C3] text-sm leading-relaxed">
        <h2 className="text-white text-lg font-medium">
          5. Profile & Personal Information
        </h2>

        <p>
          Users may voluntarily provide profile information such as:
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>Name or pseudonym</li>
          <li>Education background</li>
          <li>School or university</li>
          <li>Professional or work experience</li>
        </ul>

        <p>
          This information is optional and publicly visible within
          the governance ecosystem.
        </p>

        <p>
          Users are responsible for the accuracy and legality of the
          information they provide.
        </p>
      </section>

      {/* 6. Data Collection */}
      <section className="space-y-4 text-[#B5B5C3] text-sm leading-relaxed">
        <h2 className="text-white text-lg font-medium">
          6. Data We Process
        </h2>

        <p>
          M500 does not collect sensitive personal identification data.
        </p>

        <p>
          Data processed may include:
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>Public wallet addresses</li>
          <li>On-chain transaction data</li>
          <li>Governance participation records</li>
          <li>Optional user profile information</li>
        </ul>
      </section>

      {/* 7. Risk Disclosure */}
      <section className="space-y-4 text-[#B5B5C3] text-sm leading-relaxed">
        <h2 className="text-white text-lg font-medium">
          7. Blockchain & Participation Risk
        </h2>

        <p>
          Blockchain technology involves risks including
          network congestion, transaction failures,
          smart contract vulnerabilities, and asset volatility.
        </p>

        <p>
          Users participate entirely at their own risk.
        </p>
      </section>

      {/* 8. Limitation of Liability */}
      <section className="space-y-4 text-[#B5B5C3] text-sm leading-relaxed">
        <h2 className="text-white text-lg font-medium">
          8. Limitation of Liability
        </h2>

        <p>
          To the maximum extent permitted by law, M500 and its contributors
          shall not be liable for any direct, indirect, incidental,
          or consequential damages resulting from platform use.
        </p>
      </section>

      <div className="pt-10 border-t border-[#1F1F27] text-xs text-[#6B7280]">
        Last updated: {new Date().toLocaleDateString()}
      </div>

    </div>
  );
}