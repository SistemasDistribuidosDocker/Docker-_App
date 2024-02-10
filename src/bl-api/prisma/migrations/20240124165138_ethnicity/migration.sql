/*
  Warnings:

  - You are about to drop the column `birth_year` on the `BabyNames` table. All the data in the column will be lost.
  - You are about to drop the column `ethnicity` on the `BabyNames` table. All the data in the column will be lost.
  - Added the required column `birthYear` to the `BabyNames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ethnicityId` to the `BabyNames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BabyNames" DROP COLUMN "birth_year",
DROP COLUMN "ethnicity",
ADD COLUMN     "birthYear" INTEGER NOT NULL,
ADD COLUMN     "ethnicityId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Ethnicity" (
    "id" TEXT NOT NULL,
    "ethnicity" TEXT NOT NULL,

    CONSTRAINT "Ethnicity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BabyNames" ADD CONSTRAINT "BabyNames_ethnicityId_fkey" FOREIGN KEY ("ethnicityId") REFERENCES "Ethnicity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
