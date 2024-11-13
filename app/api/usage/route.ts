import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const usage = await db.usage.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json(usage);
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const usage = await db.usage.upsert({
      where: { userId: session.user.id },
      update: { count: { increment: 1 } },
      create: { userId: session.user.id, count: 1 },
    });

    return NextResponse.json(usage);
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}