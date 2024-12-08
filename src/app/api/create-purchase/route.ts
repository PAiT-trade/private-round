import { prisma } from "@/db/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("Request Data: ", data);

  const referralCode = randomUUID();

  // Define referral percentages for first and second level
  const USDC_PERCENTAGE_LVL1 = 0.05; // 5% USDC for Level 1
  const PAIT_PERCENTAGE_LVL1 = 0.025; // 2.5% PAiT tokens for Level 1
  const PAIT_PERCENTAGE_LVL2 = 0.025; // 2.5% PAiT tokens for Level 2 (only after third referral)

  try {
    // Fetch the user making the purchase
    let user = await prisma.user.findUnique({
      where: {
        id: Number(data.user_id),
      },
    });

    if (!user) {
      return NextResponse.json({
        status: "error",
        purchase: null,
        message: "User not found",
      });
    }

    // Check if the user has a referral code, assign one if it's null, undefined, or empty string
    if (!user.referral || user.referral === "" || user.referral === null) {
      await prisma.user.update({
        where: { id: user.id },
        data: { referral: referralCode, show_referral: true },
      });
      user.referral = referralCode; // Update local reference
    }

    const referrer = await prisma.user.findFirst({
      where: {
        referral: data.usedReferral,
      },
    });

    // If no referrer exists, create the purchase without referral rewards
    if (!referrer) {
      const purchase = await prisma.purchase.create({
        data: {
          user_id: Number(data.user_id),
          pait_tokens: Number(data.pait_tokens),
          usdc_amount: Number(data.usdc_amount),
          used_referral: "",
        },
      });

      return NextResponse.json({
        status: "success",
        purchase: purchase,
        message: "Purchase created successfully",
      });
    }

    // Referrer exists, calculate earnings for Level 1
    const usdcEarningsLvl1 = Number(data.usdc_amount) * USDC_PERCENTAGE_LVL1;
    const paitEarningsLvl1 = Number(data.pait_tokens) * PAIT_PERCENTAGE_LVL1;

    // Update Level 1 referrer's earnings
    await prisma.user.update({
      where: { id: referrer.id },
      data: {
        direct_usdc: { increment: usdcEarningsLvl1 },
        direct_pait: { increment: paitEarningsLvl1 },
      },
    });

    // Check for a second-level referrer
    const secondLevelReferrer = await prisma.user.findFirst({
      where: { referral: referrer.referral },
    });

    if (secondLevelReferrer) {
      // Reward the top-level referrer after the third referral
      const userPurchases = await prisma.purchase.count({
        where: {
          used_referral: referrer.referral,
        },
      });

      if (userPurchases >= 3) {
        const paitEarningsLvl2 =
          Number(data.pait_tokens) * PAIT_PERCENTAGE_LVL2;

        // Update second-level referrer's earnings for third referral and beyond
        await prisma.user.update({
          where: { id: secondLevelReferrer.id },
          data: {
            direct_pait: { increment: paitEarningsLvl2 },
          },
        });
      }
    }

    // Create the purchase record
    const purchase = await prisma.purchase.create({
      data: {
        user_id: Number(data.user_id),
        pait_tokens: Number(data.pait_tokens),
        usdc_amount: Number(data.usdc_amount),
        used_referral: data.usedReferral,
      },
    });

    return NextResponse.json({
      status: "success",
      purchase: purchase,
      message: "Purchase created successfully with referral rewards",
    });
  } catch (error) {
    console.log("Create Purchase Error: ", error);
    return NextResponse.json({
      status: "error",
      purchase: null,
      message: "Failed to create purchase",
    });
  }
}
