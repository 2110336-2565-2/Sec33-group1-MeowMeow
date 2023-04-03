/*	
  Warnings:	
  - The values [PENDING,ACCEPTED,REJECTED] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.	
  - Added the required column `paymentId` to the `Guide` table without a default value. This is not possible if the table is not empty.	
*/	
-- AlterEnum	
BEGIN;	
CREATE TYPE "BookingStatus_new" AS ENUM ('WAITING_FOR_GUIDE_CONFIRMATION', 'GUIDE_CANCELLED', 'WAITING_FOR_PAYMENT', 'WAITING_FOR_REFUND', 'WAITING_FOR_TRAVELING', 'TRAVELING', 'WAITING_FOR_REVIEW', 'FINISHED', 'USER_CANCELLED');	
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" DROP DEFAULT;	
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" TYPE "BookingStatus_new" USING ("bookingStatus"::text::"BookingStatus_new");	
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";	
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";	
DROP TYPE "BookingStatus_old";	
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" SET DEFAULT 'WAITING_FOR_GUIDE_CONFIRMATION';	
COMMIT;	

-- AlterTable	
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" SET DEFAULT 'WAITING_FOR_GUIDE_CONFIRMATION';	

-- AlterTable	
ALTER TABLE "Guide" ADD COLUMN     "paymentId" TEXT NOT NULL;	

-- CreateTable	
CREATE TABLE "Transaction" (	
    "id" SERIAL NOT NULL,	
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,	
    "updatedAt" TIMESTAMP(3) NOT NULL,	
    "paymentID" TEXT NOT NULL,	
    "bookingId" INTEGER NOT NULL,	
    "userId" INTEGER NOT NULL,	

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")	
);	

-- AddForeignKey	
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;	

-- AddForeignKey	
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;