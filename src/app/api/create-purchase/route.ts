import { prisma } from "@/db/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("Request Data: ", data);

  const referralCode = randomUUID();

  // Define referral percentages
  const USDC_PERCENTAGE_LVL1 = 0.05; // 5% USDC for Level 1
  const PAIT_PERCENTAGE_LVL1 = 0.025; // 2.5% PAiT tokens for Level 1
  const PAIT_PERCENTAGE_LVL2 = 0.025; // 2.5% PAiT tokens for Level 2 (only after third referral)

  try {
    // Input validation
    if (!data.user_id || isNaN(Number(data.user_id))) {
      return NextResponse.json({
        status: "error",
        purchase: null,
        message: "Invalid user ID provided",
      });
    }

    if (
      !data.usdc_amount ||
      !data.pait_tokens ||
      isNaN(data.usdc_amount) ||
      isNaN(data.pait_tokens)
    ) {
      return NextResponse.json({
        status: "error",
        purchase: null,
        message: "Invalid token or amount values",
      });
    }
    // the user who us trying to make a purchase
    const user = await prisma.user.findUnique({
      where: { id: Number(data.user_id) },
    });

    if (!user) {
      return NextResponse.json({
        status: "error",
        purchase: null,
        message: "User not found",
      });
    }

    // If this user does not have a referral code, assign one
    // Assign a referral code to the user if they don't have one
    if (!user.referral || user.referral === "" || user.referral === null) {
      await prisma.user.update({
        where: { id: user.id },
        data: { referral: referralCode, show_referral: true },
      });
      user.referral = referralCode; // Update local reference
    }

    // Validate referral code
    if (data.usedReferral && typeof data.usedReferral !== "string") {
      return NextResponse.json({
        status: "error",
        purchase: null,
        message: "Invalid referral code provided",
      });
    }

    // Check if the referral code is valid  and  get the first referrer
    const referrer = data.usedReferral
      ? await prisma.user.findFirst({
          where: { referral: data.usedReferral },
        })
      : null;

    // Create purchase without rewards if no referral code is used
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
        purchase,
        rewards: null,
        message: "Purchase created successfully without referral rewards",
      });
    }

    // Start a transaction for referral rewards
    const result = await prisma.$transaction(async (prisma) => {
      const usdcEarningsLvl1 = Number(data.usdc_amount) * USDC_PERCENTAGE_LVL1;
      const paitEarningsLvl1 = Number(data.pait_tokens) * PAIT_PERCENTAGE_LVL1;

      // Level 2 rewards
      let level2RewardData = null;

      if (referrer.referral) {
        // Level 1 rewards
        await prisma.user.update({
          where: { id: referrer.id },
          data: {
            direct_usdc: { increment: usdcEarningsLvl1 },
            direct_pait: { increment: paitEarningsLvl1 },
          },
        });
        // Level 2 rewards
        const secondLevelReferrer = await prisma.user.findFirst({
          where: { referral: referrer.referral },
        });

        if (secondLevelReferrer) {
          const userPurchases = await prisma.purchase.count({
            where: { used_referral: referrer.referral },
          });

          if (userPurchases >= 3) {
            const paitEarningsLvl2 =
              Number(data.pait_tokens) * PAIT_PERCENTAGE_LVL2;
            await prisma.user.update({
              where: { id: secondLevelReferrer.id },
              data: {
                direct_pait: { increment: paitEarningsLvl2 },
              },
            });

            level2RewardData = {
              referrerId: secondLevelReferrer.id,
              paitReward: paitEarningsLvl2,
            };
          }
        }
      }

      // Create purchase record
      const purchase = await prisma.purchase.create({
        data: {
          user_id: Number(data.user_id),
          pait_tokens: Number(data.pait_tokens),
          usdc_amount: Number(data.usdc_amount),
          used_referral: data.usedReferral || "",
        },
      });

      return {
        purchase,
        rewards: {
          lvl1: { usdc: usdcEarningsLvl1, pait: paitEarningsLvl1 },
          lvl2: level2RewardData,
        },
      };
    });

    return NextResponse.json({
      status: "success",
      purchase: result.purchase,
      rewards: result.rewards,
      message: "Purchase created successfully with referral rewards",
    });
  } catch (error) {
    console.error("Create Purchase Error: ", error);
    return NextResponse.json({
      status: "error",
      purchase: null,
      message: "Failed to create purchase",
    });
  }
}
