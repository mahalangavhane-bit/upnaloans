-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('GENERATED', 'PRESENTED', 'SELECTED', 'REJECTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "LoanOffer" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "lenderId" TEXT NOT NULL,
    "productId" TEXT,
    "status" "OfferStatus" NOT NULL DEFAULT 'GENERATED',
    "amount" DECIMAL(15,2),
    "interestRate" DECIMAL(5,2),
    "tenure" INTEGER,
    "monthlyEmi" DECIMAL(15,2),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LoanOffer_applicationId_idx" ON "LoanOffer"("applicationId");

-- CreateIndex
CREATE INDEX "LoanOffer_lenderId_idx" ON "LoanOffer"("lenderId");

-- CreateIndex
CREATE INDEX "LoanOffer_productId_idx" ON "LoanOffer"("productId");

-- CreateIndex
CREATE INDEX "LoanOffer_applicationId_status_idx" ON "LoanOffer"("applicationId", "status");

-- AddForeignKey
ALTER TABLE "LoanOffer" ADD CONSTRAINT "LoanOffer_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanOffer" ADD CONSTRAINT "LoanOffer_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanOffer" ADD CONSTRAINT "LoanOffer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LenderProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
