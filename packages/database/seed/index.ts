import { PrismaClient } from "@prisma/client";

import { devSeed } from "./dev.seed";

const prisma = new PrismaClient();

async function main() {
  console.log(`Execute ${process.argv[2] ?? "default"} seeding`);
  switch (process.argv[2]) {
    case "dev":
      devSeed(prisma);
      break;
    default:
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
