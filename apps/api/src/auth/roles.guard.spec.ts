import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RolesGuard } from './roles.guard';
import { UserRole } from './roles.decorator';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as Reflector;

    guard = new RolesGuard(reflector);
  });

  const createContext = (user?: any) =>
    ({
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({
          user,
        }),
      }),
    }) as unknown as ExecutionContext;

  it('should allow access when no roles are required', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(undefined);

    expect(
      guard.canActivate(createContext()),
    ).toBe(true);
  });

  it('should allow ADMIN on ADMIN-only endpoint', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([UserRole.ADMIN]);

    expect(
      guard.canActivate(
        createContext({
          sub: 'user-1',
          customerId: 'customer-1',
          phone: '9999999999',
          role: UserRole.ADMIN,
        }),
      ),
    ).toBe(true);
  });

  it('should reject CUSTOMER on ADMIN-only endpoint', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([UserRole.ADMIN]);

    expect(() =>
      guard.canActivate(
        createContext({
          sub: 'user-1',
          customerId: 'customer-1',
          phone: '9999999999',
          role: UserRole.CUSTOMER,
        }),
      ),
    ).toThrow(ForbiddenException);
  });

  it('should reject AGENT on ADMIN-only endpoint', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([UserRole.ADMIN]);

    expect(() =>
      guard.canActivate(
        createContext({
          sub: 'user-2',
          customerId: 'customer-2',
          phone: '8888888888',
          role: UserRole.AGENT,
        }),
      ),
    ).toThrow(ForbiddenException);
  });

  it('should allow AGENT when AGENT is permitted', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([
        UserRole.ADMIN,
        UserRole.AGENT,
      ]);

    expect(
      guard.canActivate(
        createContext({
          sub: 'user-2',
          customerId: 'customer-2',
          phone: '8888888888',
          role: UserRole.AGENT,
        }),
      ),
    ).toBe(true);
  });

  it('should reject when authenticated user information is missing', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([UserRole.ADMIN]);

    expect(() =>
      guard.canActivate(createContext()),
    ).toThrow(
      'User information is missing',
    );
  });
});