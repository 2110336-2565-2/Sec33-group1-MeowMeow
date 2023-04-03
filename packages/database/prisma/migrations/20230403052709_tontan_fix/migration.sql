/*
  Warnings:

  - The values [WAITING_FOR_REVIEW] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `guideId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `certificate` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `guideId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `guideId` on the `TourStyle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationName]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tourStyleName]` on the table `TourStyle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandBankAccount` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificateId` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameBankAccount` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberBankAccount` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactInfo` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxParticipant` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `transactionType` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CHARGES', 'TRANSFERS', 'REFUNDS');

-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('WAITING_FOR_GUIDE_CONFIRMATION', 'GUIDE_CANCELLED', 'WAITING_FOR_PAYMENT', 'WAITING_FOR_REFUND', 'WAITING_FOR_TRAVELING', 'TRAVELING', 'FINISHED', 'USER_CANCELLED');
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" TYPE "BookingStatus_new" USING ("bookingStatus"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "BookingStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" SET DEFAULT 'WAITING_FOR_GUIDE_CONFIRMATION';
COMMIT;

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_guideId_fkey";

-- DropForeignKey
ALTER TABLE "Guide" DROP CONSTRAINT "Guide_userId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_guideId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_guideId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "TourStyle" DROP CONSTRAINT "TourStyle_guideId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "guideId";

-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "certificate",
ADD COLUMN     "brandBankAccount" TEXT NOT NULL,
ADD COLUMN     "certificateId" TEXT NOT NULL,
ADD COLUMN     "nameBankAccount" TEXT NOT NULL,
ADD COLUMN     "numberBankAccount" TEXT NOT NULL,
ADD COLUMN     "taxId" TEXT;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "guideId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "contactInfo" TEXT NOT NULL,
ADD COLUMN     "maxParticipant" INTEGER NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "publishDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "text" SET NOT NULL;

-- AlterTable
ALTER TABLE "TourStyle" DROP COLUMN "guideId";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transactionType" "TransactionType" NOT NULL;

-- CreateTable
CREATE TABLE "GuideLocation" (
    "guideId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "GuideLocation_pkey" PRIMARY KEY ("guideId","locationId")
);

-- CreateTable
CREATE TABLE "GuideTourStyle" (
    "guideId" INTEGER NOT NULL,
    "tourStyleId" INTEGER NOT NULL,

    CONSTRAINT "GuideTourStyle_pkey" PRIMARY KEY ("guideId","tourStyleId")
);

-- CreateTable
CREATE TABLE "PostLocation" (
    "postId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "PostLocation_pkey" PRIMARY KEY ("postId","locationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_locationName_key" ON "Location"("locationName");

-- CreateIndex
CREATE UNIQUE INDEX "TourStyle_tourStyleName_key" ON "TourStyle"("tourStyleName");

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideLocation" ADD CONSTRAINT "GuideLocation_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideLocation" ADD CONSTRAINT "GuideLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideTourStyle" ADD CONSTRAINT "GuideTourStyle_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideTourStyle" ADD CONSTRAINT "GuideTourStyle_tourStyleId_fkey" FOREIGN KEY ("tourStyleId") REFERENCES "TourStyle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLocation" ADD CONSTRAINT "PostLocation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLocation" ADD CONSTRAINT "PostLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
