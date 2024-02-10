/*
  Warnings:

  - Changed the type of `birth_year` on the `BabyNames` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BabyNames" DROP COLUMN "birth_year",
ADD COLUMN     "birth_year" INTEGER NOT NULL;
