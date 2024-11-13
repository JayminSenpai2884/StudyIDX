import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getStripeSession } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { priceId } = await req.json();
    const stripeSession = await getStripeSession(priceId, session.user.id);

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Error", { status: 500 });
  }
}