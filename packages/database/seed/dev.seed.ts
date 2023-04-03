import { SeedGenerator } from "./types";
import { backendConfig } from "config";
import * as bcrypt from "bcrypt";

export const devSeed: SeedGenerator = async (prisma) => {
  const hashRound = backendConfig.bcrypt.hashRound;
  await prisma.$transaction([
    prisma.user.createMany({
      data: [
        {
          id: 1,
          updatedAt: new Date(),
          email: "jester@gmail.com",
          hashedPassword: await bcrypt.hash("12345678", hashRound),
          username: "pinkerton",
          firstName: "Arthur",
          lastName: "Morgan",
        },
        {
          id: 2,
          updatedAt: new Date(),
          email: "test@gmail.com",
          hashedPassword: await bcrypt.hash("12345678", hashRound),
          username: "chuck",
          firstName: "Charles",
          lastName: "McGill",
        },
        {
          id: 3,
          updatedAt: new Date(),
          email: "testguide@gmail.com",
          hashedPassword: await bcrypt.hash("12345678", hashRound),
          username: "LosHeavenGuide",
          firstName: "Tommy",
          lastName: "Angelo",
        },
      ],
    }),
  ]);
};
