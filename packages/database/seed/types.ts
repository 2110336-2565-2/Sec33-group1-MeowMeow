import { PrismaClient } from "@prisma/client";

export interface ISeed {
  (prisma: PrismaClient): Promise<void>;
}
