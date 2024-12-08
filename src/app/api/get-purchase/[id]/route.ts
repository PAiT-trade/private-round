// app/api/purchase/[id]/route.ts
import { prisma } from "@/db/prisma"; // Adjust the import according to your project structure
import { NextResponse } from "next/server";

export async function GET(req: Request, res: { params: { id: string } }) {
  try {
    const { id } = res.params;
    if (!id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid or missing id parameter",
        },
        { status: 400 }
      );
    }

    const purchaseId = parseInt(id, 10);

    const purchase = await prisma.purchase.findFirst({
      where: { id: purchaseId },
      include: { user: true },
    });

    if (!purchase) {
      return NextResponse.json(
        {
          status: "error",
          message: "Purchase not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      purchase: purchase,
      message: "Purchase retrieved successfully",
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
