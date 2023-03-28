/*
  Warnings:

  - You are about to drop the column `guideId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `guideId` on the `TourStyle` table. All the data in the column will be lost.
  - Added the required column `contactInfo` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxParticipant` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_guideId_fkey";

-- DropForeignKey
ALTER TABLE "TourStyle" DROP CONSTRAINT "TourStyle_guideId_fkey";

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

-- AddForeignKey
ALTER TABLE "GuideLocation" ADD CONSTRAINT "GuideLocation_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideLocation" ADD CONSTRAINT "GuideLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideTourStyle" ADD CONSTRAINT "GuideTourStyle_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideTourStyle" ADD CONSTRAINT "GuideTourStyle_tourStyleId_fkey" FOREIGN KEY ("tourStyleId") REFERENCES "TourStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLocation" ADD CONSTRAINT "PostLocation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLocation" ADD CONSTRAINT "PostLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
