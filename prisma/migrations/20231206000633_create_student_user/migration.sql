-- CreateTable
CREATE TABLE "studentUsers" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT,
    "birthday" TEXT,
    "weight" TEXT,
    "height" TEXT,
    "goal" TEXT,

    CONSTRAINT "studentUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "studentUsers_email_key" ON "studentUsers"("email");
