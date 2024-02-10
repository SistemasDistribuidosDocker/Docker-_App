-- CreateTable
CREATE TABLE "BabyNames" (
    "id" TEXT NOT NULL,
    "birth_year" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "ethnicity" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "BabyNames_pkey" PRIMARY KEY ("id")
);
