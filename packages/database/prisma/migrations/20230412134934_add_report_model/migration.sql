-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('GUIDE', 'TRIP', 'SYSTEM', 'OTHER');

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportType" "ReportType" NOT NULL DEFAULT 'OTHER',
    "text" TEXT NOT NULL,
    "reporterId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
