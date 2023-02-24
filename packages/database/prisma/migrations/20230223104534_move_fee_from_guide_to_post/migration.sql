/*
  Warnings:

  - You are about to drop the column `fee` on the `Guide` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "fee";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "fee" DECIMAL(10,2) NOT NULL DEFAULT 1000;
