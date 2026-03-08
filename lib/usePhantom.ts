"use client";

import { useEffect, useState } from "react";

export function usePhantom() {
  const [wallet, setWallet] = useState<string | null>(null);

  const connect = async () => {
    const provider = (window as any).solana;

    if (!provider || !provider.isPhantom) {
      alert("Phantom not found");
      return;
    }

    const response = await provider.connect();
    setWallet(response.publicKey.toString());
  };

  const disconnect = async () => {
    const provider = (window as any).solana;
    await provider.disconnect();
    setWallet(null);
  };

  useEffect(() => {
    const provider = (window as any).solana;

    if (!provider || !provider.isPhantom) return;

    // 👇 Auto reconnect
    provider.connect({ onlyIfTrusted: true })
      .then((res: any) => {
        setWallet(res.publicKey.toString());
      })
      .catch(() => {});

    provider.on("connect", () =>
      setWallet(provider.publicKey.toString())
    );

    provider.on("disconnect", () =>
      setWallet(null)
    );
  }, []);

  return { wallet, connect, disconnect };
}