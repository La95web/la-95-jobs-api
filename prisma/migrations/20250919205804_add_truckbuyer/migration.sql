/*
  Warnings:

  - You are about to drop the `UserDispatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDrivers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOperator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOther` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRealState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."UserDispatch";

-- DropTable
DROP TABLE "public"."UserDrivers";

-- DropTable
DROP TABLE "public"."UserOperator";

-- DropTable
DROP TABLE "public"."UserOther";

-- DropTable
DROP TABLE "public"."UserRealState";

-- CreateTable
CREATE TABLE "public"."drivers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dispatch" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."owner_operator" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "owner_operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."real_state" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "real_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."others" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "others_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."truck_buyer" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "truck_buyer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_email_key" ON "public"."drivers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dispatch_email_key" ON "public"."dispatch"("email");

-- CreateIndex
CREATE UNIQUE INDEX "owner_operator_email_key" ON "public"."owner_operator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "real_state_email_key" ON "public"."real_state"("email");

-- CreateIndex
CREATE UNIQUE INDEX "others_email_key" ON "public"."others"("email");

-- CreateIndex
CREATE UNIQUE INDEX "truck_buyer_email_key" ON "public"."truck_buyer"("email");
