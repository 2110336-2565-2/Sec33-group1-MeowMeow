import { SeedGenerator } from "./types";

export const devSeed: SeedGenerator = async (prisma) => {
  await prisma.$transaction([
    prisma.user.createMany({
      data: [],
    }),
  ]);
};
