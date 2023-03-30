/*
  Warnings:

  - Added the required column `brandBankAccount` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameBankAccount` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberBankAccount` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guide" ADD COLUMN     "brandBankAccount" TEXT NOT NULL,
ADD COLUMN     "nameBankAccount" TEXT NOT NULL,
ADD COLUMN     "numberBankAccount" TEXT NOT NULL,
ADD COLUMN     "taxId" TEXT;
