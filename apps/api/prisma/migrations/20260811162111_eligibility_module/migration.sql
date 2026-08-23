-- CreateEnum
CREATE TYPE "EligibilityStatus" AS ENUM ('PENDING', 'ELIGIBLE', 'NOT_ELIGIBLE', 'ERROR');

-- CreateTable
CREATE TABLE "EligibilityCheck" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "lenderId" TEXT NOT NULL,
    "productId" TEXT,
    "status" "EligibilityStatus" NOT NULL DEFAULT 'PENDING',
    "ruleVersion" INTEGER,
    "details" JSONB,
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EligibilityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EligibilityCheck_applicationId_idx" ON "EligibilityCheck"("applicationId");

-- CreateIndex
CREATE INDEX "EligibilityCheck_lenderId_idx" ON "EligibilityCheck"("lenderId");

-- CreateIndex
CREATE INDEX "EligibilityCheck_productId_idx" ON "EligibilityCheck"("productId");

-- AddForeignKey
ALTER TABLE "EligibilityCheck" ADD CONSTRAINT "EligibilityCheck_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityCheck" ADD CONSTRAINT "EligibilityCheck_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityCheck" ADD CONSTRAINT "EligibilityCheck_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LenderProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
