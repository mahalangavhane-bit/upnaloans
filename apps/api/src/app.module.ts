import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerProfileModule } from './customer-profile/customer-profile.module';
import { LeadsModule } from './leads/leads.module';
import { ApplicationsModule } from './applications/applications.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { LenderMatchingModule } from './lender-matching/lender-matching.module';
import { LendersModule } from './lenders/lenders.module';
import { LenderProductsModule } from './lender-products/lender-products.module';
import { LenderRulesModule } from './lender-rules/lender-rules.module';
import { LoanOffersModule } from './loan-offers/loan-offers.module';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [CustomersModule, PrismaModule, CustomerProfileModule, LeadsModule, ApplicationsModule, EligibilityModule, LenderMatchingModule, LendersModule, LenderProductsModule, LenderRulesModule, LoanOffersModule, AuthModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
