import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = await req.json();

    // Mock Verification: Assumes signature is valid for sandbox mode.
    await db.order.update({
      where: { id: order_id },
      data: {
        status: "PREPARING",
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
