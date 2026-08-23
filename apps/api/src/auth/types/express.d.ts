import { UserRole } from '../roles.decorator';

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        customerId: string;
        phone: string;
        role: UserRole;
        iat?: number;
        exp?: number;
      };
    }
  }
}

export {};