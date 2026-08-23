-- CreateTable
CREATE TABLE "LenderRuleVersion" (
    "id" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "ruleType" TEXT NOT NULL,
    "ruleConfig" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LenderRuleVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LenderRuleVersion_ruleId_version_idx" ON "LenderRuleVersion"("ruleId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "LenderRuleVersion_ruleId_version_key" ON "LenderRuleVersion"("ruleId", "version");

-- AddForeignKey
ALTER TABLE "LenderRuleVersion" ADD CONSTRAINT "LenderRuleVersion_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "LenderRule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
