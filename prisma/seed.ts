console.log("App Builder");
// const { PrismaClient } = require("@prisma/client");
// const { randomUUID } = require("crypto");

// const db = new PrismaClient();

// const users = [
//   {
//     wallet: "HifcJVRc6RRVFWDZd5HzrXtX92LBEMFXsejByNfuSw56",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Jonas 	Dovydaitis",
//     telegram: "@jd2022022",
//     email: "jonas@pait.fi",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },
//   {
//     wallet: "ASVhQSuRrB9CqyR347kSJJihGZgWeqA1W5JmTBGmrPFw",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Justinas Areliunas",
//     telegram: "",
//     email: "justinas@pait.fi",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },
//   {
//     wallet: "4LVcHDJmv2athFJWL5xSCaxEQxYjHSdg32hX8g3pJa3V",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Darius	Greicius",
//     telegram: "@alchemist_ghost",
//     email: "darius@pait.fi",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },

//   {
//     wallet: "ERgpvPPvSYnqTNay5uFRvcCiHYF48g9VkqXw8NroFepx",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Dauglous	Omambia",
//     telegram: "",
//     email: "douglous@pait.fi",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },
//   {
//     wallet: "8FpZzzM6r4N4gXDfNMGAB49zMJDpgwK2PNwGtMGiYVYS",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Mantas	Girdvainis",
//     telegram: "",
//     email: "mantas@pait.fi",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },
//   {
//     wallet: "CLGXvtuToaLQ7PUuQ3HXRcTdP8AwWc3CeGhcoPvQUKB6",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Sarthak Sharma",
//     telegram: "",
//     email: "sarthak1806@gmail.com",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },

//   {
//     wallet: "4uKzZtVBMNRvFwBjR7u2Y43nfEc2mMfSPFjhwPZCgMT2",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Maria Lobanova",
//     telegram: "@marialobanova",
//     email: "ML@interstellardigital.io",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },

//   {
//     wallet: "DZ75HGmX8h9VA9t6364v2tWAeyXzTszvyvGwQCK29ERz",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Shy Chyi Cecily",
//     telegram: "",
//     email: "cecily369@gmail.com",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },

//   {
//     wallet: "DqdpDm34v1QcaP2Xcc7kasFcZsFj5Ki8yGiwm4BV4XQu",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Wilson Yan",
//     telegram: "@Sagai21",
//     email: "s21.hkr@gmail.com",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },

//   {
//     wallet: "7xucekz6shei5XvDeULrNJ5Q8JKmxkShgFAqKUPvhzRD",
//     referral: "",
//     is_approved: true,
//     show_referral: true,
//     name: "Eric Benz",
//     telegram: "",
//     email: "e@mynt.vc",
//     direct_usdc: 0,
//     direct_pait: 0,
//     secondary_tokens: 0,
//   },
// ];

// async function main() {
//   for (const user of users) {
//     const exists = await db.user.findFirst({
//       where: { wallet: user.wallet },
//     });

//     if (!exists) {
//       const referralCode = randomUUID();
//       const response = await db.user.create({
//         data: { ...user, referral: referralCode },
//       });

//       console.log(`
//         Name: ${response.name}
//         https://presale.pait.fi/?referral=${response.wallet}`);
//     }
//   }

//   console.log("Seed data created successfully!");
// }

// main()
//   .catch((e: any) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await db.$disconnect();
//   });
