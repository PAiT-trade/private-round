import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("data", data);

    if (!data || typeof data.remaining === "undefined") {
      return NextResponse.json({
        status: "error",
        message: "Invalid input data",
      });
    }

    const allocation = await prisma.allocation.create({
      data: {
        remaining: Number(data.remaining),
      },
    });
    return NextResponse.json({
      status: "success",
      allocation,
      message: "Updated allocations successfully",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      status: "error",
      message: "Error updating allocations",
    });
  }
}
