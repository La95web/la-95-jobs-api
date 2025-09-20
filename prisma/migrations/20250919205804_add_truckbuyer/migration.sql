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
CREATE TABLE "public"."UserDrivers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDrivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserDispatch" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDispatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserOperator" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserOperator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserRealState" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRealState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserOther" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserOther_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TruckBuyer" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TruckBuyer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_email_key" ON "public"."UserDrivers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dispatch_email_key" ON "public"."UserDispatch"("email");

-- CreateIndex
CREATE UNIQUE INDEX "owner_operator_email_key" ON "public"."UserOperator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "real_state_email_key" ON "public"."UserRealState"("email");

-- CreateIndex
CREATE UNIQUE INDEX "others_email_key" ON "public"."UserOther"("email");

-- CreateIndex
CREATE UNIQUE INDEX "truck_buyer_email_key" ON "public"."TruckBuyer"("email");
