import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: any) {
  try {
    const allocations = await prisma.allocation.findMany({
      take: 1,
      orderBy: [
        {
          id: "desc",
        },
      ],
    });

    if (allocations.length === 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Allocation not found",
          allocation: 0,
        },
        { status: 200 }
      );
    }

    const allocation = allocations[0]
      ? allocations[0]
      : {
          id: 0,
          remaining: 1956000,
          created_at: new Date(Date.now()),
        };
    return NextResponse.json({
      status: "success",
      allocation,
      message: "Allocation retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving allocation:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to retrieve allocation",
      },
      { status: 200 }
    );
  }
}
