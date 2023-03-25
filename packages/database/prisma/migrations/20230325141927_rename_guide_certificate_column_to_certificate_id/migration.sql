/*
  Warnings:

  - You are about to drop the column `certificate` on the `Guide` table. All the data in the column will be lost.
  - Added the required column `certificateId` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "certificate",
ADD COLUMN     "certificateId" TEXT NOT NULL;
