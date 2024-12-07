// app/api/user-has-purchases/[id]/route.ts
import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid or missing id parameter",
        },
        { status: 400 }
      );
    }

    const userId = parseInt(id, 10);

    // Count purchases for the given user
    const userHasPurchase =
      (await prisma.purchase.count({
        where: { user_id: userId },
      })) > 0;

    return NextResponse.json({
      status: "success",
      userHasPurchase,
      message: "User has purchases",
    });
  } catch (error) {
    console.error("Error retrieving purchase:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to retrieve purchase",
      },
      { status: 500 }
    );
  }
}
