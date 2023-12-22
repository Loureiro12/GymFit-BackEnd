/*
  Warnings:

  - You are about to drop the column `disabled` on the `studentUsers` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusUserStatus" AS ENUM ('ENABLE', 'DISABLED');

-- AlterTable
ALTER TABLE "studentUsers" DROP COLUMN "disabled",
ADD COLUMN     "status" "StatusUserStatus" NOT NULL DEFAULT 'ENABLE';
