-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "wallet" TEXT NOT NULL,
    "referral" TEXT NOT NULL DEFAULT '',
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "show_referral" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT DEFAULT '',
    "telegram" TEXT DEFAULT '',
    "email" TEXT DEFAULT '',
    "direct_usdc" DOUBLE PRECISION DEFAULT 0,
    "direct_pait" DOUBLE PRECISION DEFAULT 0,
    "secondary_tokens" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pait_tokens" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "usdc_amount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "used_referral" TEXT DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allocations" (
    "id" SERIAL NOT NULL,
    "remaining" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "allocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_key" ON "users"("wallet");

-- CreateIndex
CREATE INDEX "purchases_user_id_created_at_idx" ON "purchases"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
