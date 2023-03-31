-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_guideId_fkey";
ALTER TABLE "Booking" DROP COLUMN "guideId";
