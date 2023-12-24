-- CreateTable
CREATE TABLE "food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "portion" TEXT NOT NULL,
    "calories" TEXT NOT NULL,
    "carbohydrates" TEXT NOT NULL,
    "protein" TEXT NOT NULL,
    "fat" TEXT NOT NULL,
    "fiber" TEXT NOT NULL,

    CONSTRAINT "food_pkey" PRIMARY KEY ("id")
);
