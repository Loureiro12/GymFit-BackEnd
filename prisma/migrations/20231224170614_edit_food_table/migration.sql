/*
  Warnings:

  - You are about to drop the `food` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "food";

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "portion" TEXT NOT NULL,
    "calories" TEXT NOT NULL,
    "carbohydrates" TEXT NOT NULL,
    "protein" TEXT NOT NULL,
    "fat" TEXT NOT NULL,
    "fiber" TEXT NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);
