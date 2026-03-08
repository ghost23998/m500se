"use client";

import { useEffect, useState } from "react";

export function usePhantom() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const solana = (window as any).solana;

      if (solana?.isPhantom) {
        setProvider(solana);
      }
    }
  }, []);

  const connect = async () => {
    if (!provider) {
      alert("Phantom not found");
      return;
    }

    try {
      const response = await provider.connect();
      setWallet(response.publicKey.toString());
    } catch (err) {
      console.error("Connect error", err);
    }
  };

  const disconnect = async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
      setWallet(null);
    } catch (err) {
      console.error("Disconnect error", err);
    }
  };

  useEffect(() => {
    if (!provider) return;

    const handleConnect = () => {
      setWallet(provider.publicKey.toString());
    };

    const handleDisconnect = () => {
      setWallet(null);
    };

    provider.on("connect", handleConnect);
    provider.on("disconnect", handleDisconnect);

    return () => {
      provider.off("connect", handleConnect);
      provider.off("disconnect", handleDisconnect);
    };
  }, [provider]);

  return { wallet, connect, disconnect };
}