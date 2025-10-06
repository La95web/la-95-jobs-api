-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- RenameIndex
ALTER INDEX "public"."truck_buyer_email_key" RENAME TO "TruckBuyer_email_key";

-- RenameIndex
ALTER INDEX "public"."dispatch_email_key" RENAME TO "UserDispatch_email_key";

-- RenameIndex
ALTER INDEX "public"."drivers_email_key" RENAME TO "UserDrivers_email_key";

-- RenameIndex
ALTER INDEX "public"."owner_operator_email_key" RENAME TO "UserOperator_email_key";

-- RenameIndex
ALTER INDEX "public"."others_email_key" RENAME TO "UserOther_email_key";

-- RenameIndex
ALTER INDEX "public"."real_state_email_key" RENAME TO "UserRealState_email_key";
