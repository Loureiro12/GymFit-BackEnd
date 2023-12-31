-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('thorax', 'shoulder', 'triceps', 'back', 'abdomen', 'biceps', 'leg', 'glute');

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "muscleGroup" "MuscleGroup" NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);
