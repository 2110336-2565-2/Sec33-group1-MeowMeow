/*
  Warnings:

  - The values [WAITING_FOR_REVIEW] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
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
