import { PrismaClient } from "@prisma/client";
import fs from "fs";
// const { randomUUID } = require("crypto");

const db = new PrismaClient();
console.log(`${__dirname}`);

async function main() {
  const users = JSON.parse(
    fs.readFileSync(`${__dirname}/data/users.json`, "utf-8")
  );

  for (const user of users) {
    const exists = await db.user.findFirst({
      where: { wallet: user.wallet },
    });
    if (!exists) {
      const response = await db.user.create({
        data: { ...user },
      });
    } else {
      console.log("User already exists");
    }
  }

  // save users
  const purchases = JSON.parse(
    fs.readFileSync(`${__dirname}/data/purchases.json`, "utf-8")
  );

  for (const purchase of purchases) {
    const exists = await db.purchase.findFirst({
      where: { id: purchase.id },
    });
    if (!exists) {
      const response = await db.purchase.create({
        data: { ...purchase },
      });
    } else {
      console.log("Purchase already exists");
    }
  }
  // save pruchases
  const allocations = JSON.parse(
    fs.readFileSync(`${__dirname}/data/allocations.json`, "utf-8")
  );
  // save allocations

  for (const allocation of allocations) {
    const exists = await db.allocation.findFirst({
      where: { id: allocation.id },
    });
    if (!exists) {
      const response = await db.allocation.create({
        data: { ...allocation },
      });
    } else {
      console.log("Allocation already exists");
    }
  }

  console.log("Succesfully seeded data");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
