import { PrismaClient } from "@prisma/client";

export interface SeedGenerator {
  (prisma: PrismaClient): Promise<void>;
}
