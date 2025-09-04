-- CreateTable
CREATE TABLE "public"."UserDrivers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserDrivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserDispatch" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserDispatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserOperator" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserOperator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserRealState" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserRealState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserOther" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserOther_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDrivers_email_key" ON "public"."UserDrivers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserDispatch_email_key" ON "public"."UserDispatch"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserOperator_email_key" ON "public"."UserOperator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserRealState_email_key" ON "public"."UserRealState"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserOther_email_key" ON "public"."UserOther"("email");
