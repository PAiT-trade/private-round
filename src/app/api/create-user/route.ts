import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const dbData = {
      wallet: data.wallet,
    };

    const exist = await prisma.user.findFirst({
      where: { wallet: data.wallet },
    });

    if (exist) {
      return NextResponse.json({
        status: "success",
        user: exist,
        message: "User already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        wallet: data.wallet,
        direct_pait: 0,
        direct_usdc: 0,
      },
    });

    return NextResponse.json({
      status: "success",
      user: user,
      message: "User created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to generate referral",
    });
  }
}
