import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, restaurantId, deliveryAddress } = await req.json();

    if (!items || items.length === 0 || !restaurantId) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    const rzpOrder = await createRazorpayOrder(totalAmount * 100);

    const order = await db.order.create({
      data: {
        userId: (session.user as any).id,
        restaurantId,
        totalAmount,
        status: "PENDING",
        razorpayOrderId: rzpOrder.id,
        deliveryAddress: deliveryAddress || "Self Pickup",
      }
    });

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
    });

  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
