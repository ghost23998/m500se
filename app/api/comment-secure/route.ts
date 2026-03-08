import bs58 from "bs58";
import nacl from "tweetnacl";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );

    const body = await req.json();
    const { wallet, proposalId, content, message, signature } = body;

    if (!wallet || !proposalId || !content || !message || !signature) {
      return NextResponse.json({
        success: false,
        error: "Missing fields",
      });
    }

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

    await supabase.from("comments").insert({
      proposal_id: proposalId,
      wallet,
      content,
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