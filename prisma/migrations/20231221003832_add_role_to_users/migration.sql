-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT', 'PROFESSOR');

-- AlterTable
ALTER TABLE "studentUsers" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';
