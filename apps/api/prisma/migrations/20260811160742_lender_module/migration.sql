-- CreateEnum
CREATE TYPE "LenderStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Lender" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "LenderStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LenderProduct" (
    "id" TEXT NOT NULL,
    "lenderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "minAmount" DECIMAL(15,2),
    "maxAmount" DECIMAL(15,2),
    "minTenure" INTEGER,
    "maxTenure" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LenderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LenderRule" (
    "id" TEXT NOT NULL,
    "lenderId" TEXT NOT NULL,
    "productId" TEXT,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ruleType" TEXT NOT NULL,
    "ruleConfig" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LenderRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lender_code_key" ON "Lender"("code");

-- CreateIndex
CREATE INDEX "LenderProduct_lenderId_idx" ON "LenderProduct"("lenderId");

-- CreateIndex
CREATE UNIQUE INDEX "LenderProduct_lenderId_code_key" ON "LenderProduct"("lenderId", "code");

-- CreateIndex
CREATE INDEX "LenderRule_lenderId_idx" ON "LenderRule"("lenderId");

-- CreateIndex
CREATE INDEX "LenderRule_productId_idx" ON "LenderRule"("productId");

-- CreateIndex
CREATE INDEX "LenderRule_lenderId_isActive_idx" ON "LenderRule"("lenderId", "isActive");

-- AddForeignKey
ALTER TABLE "LenderProduct" ADD CONSTRAINT "LenderProduct_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LenderRule" ADD CONSTRAINT "LenderRule_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LenderRule" ADD CONSTRAINT "LenderRule_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LenderProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
