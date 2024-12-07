const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { uploadToS3 } = require("./../lib/aws");

async function backupDatabase() {
  try {
    const purchases = await prisma.purchase.findMany();
    const users = await prisma.user.findMany();

    const backupData = {
      users,
      purchases,
    };

    const jsonData = JSON.stringify(backupData, null, 2);

    // Generate a timestamped Filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `backup-${timestamp}.json`;

    const blob = new Blob([jsonData], { type: "application/json" });
    const file = new File([blob], filename, { type: "application/json" });
    await uploadToS3(file, process.env.AWS_S3_BUCKET_NAME!, filename);
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}
backupDatabase();
