/*
  Warnings:

  - A unique constraint covering the columns `[locationName]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tourStyleName]` on the table `TourStyle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_locationName_key" ON "Location"("locationName");

-- CreateIndex
CREATE UNIQUE INDEX "TourStyle_tourStyleName_key" ON "TourStyle"("tourStyleName");
