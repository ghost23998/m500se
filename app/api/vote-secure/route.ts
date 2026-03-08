import bs58 from "bs58";
import nacl from "tweetnacl";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { wallet, proposalId, choice, message, signature } = body;

    if (!wallet || !proposalId || !choice || !message || !signature) {
      return NextResponse.json({
        success: false,
        error: "Missing fields",
      });
    }

    // ✅ Base58 decode doğru yöntem
    const publicKey = bs58.decode(wallet);

    const msgUint8 = new TextEncoder().encode(message);
    const sigUint8 = new Uint8Array(signature);

    const verified = nacl.sign.detached.verify(
      msgUint8,
      sigUint8,
      publicKey
    );

    if (!verified) {
      return NextResponse.json({
        success: false,
        error: "Invalid signature",
      });
    }

    // Citizen kontrol
    const { data: citizen } = await supabase
      .from("citizens")
      .select("wallet")
      .eq("wallet", wallet)
      .maybeSingle();

    if (!citizen) {
      return NextResponse.json({
        success: false,
        error: "Not a citizen",
      });
    }

    // Vote insert
    await supabase.from("votes").insert({
      proposal_id: proposalId,
      wallet,
      choice,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      error: "Server error",
    });
  }
}