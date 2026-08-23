import { ForbiddenException } from '@nestjs/common';

import { DocumentUrlService } from './document-url.service';

describe('DocumentUrlService', () => {
  let service: DocumentUrlService;

  beforeEach(() => {
    process.env.DOCUMENT_URL_SECRET =
      'test-document-secret';

    process.env.DOCUMENT_URL_TTL_SECONDS = '600';

    service = new DocumentUrlService();
  });

  afterEach(() => {
    delete process.env.DOCUMENT_URL_SECRET;
    delete process.env.DOCUMENT_URL_TTL_SECONDS;
    jest.restoreAllMocks();
  });

  it('should generate a signed URL', () => {
    const result = service.generate(
      'document-1',
      'customer-1',
    );

    expect(result.url).toContain(
      '/api/v1/documents/document-1/download',
    );

    expect(result.url).toContain(
      'customerId=customer-1',
    );

    expect(result.expiresAt).toBeGreaterThan(
      Math.floor(Date.now() / 1000),
    );

    expect(result.url).toContain(
      'signature=',
    );
  });

  it('should accept a valid signed URL', () => {
    const result = service.generate(
      'document-1',
      'customer-1',
    );

    expect(() =>
      service.verify(
        'document-1',
        'customer-1',
        result.expiresAt,
        new URL(
          `http://localhost${result.url}`,
        ).searchParams.get('signature')!,
      ),
    ).not.toThrow();
  });

  it('should reject a tampered signature', () => {
    const result = service.generate(
      'document-1',
      'customer-1',
    );

    expect(() =>
      service.verify(
        'document-1',
        'customer-1',
        result.expiresAt,
        'invalid-signature',
      ),
    ).toThrow(ForbiddenException);
  });

  it('should reject a foreign customer', () => {
    const result = service.generate(
      'document-1',
      'customer-1',
    );

    const signature = new URL(
      `http://localhost${result.url}`,
    ).searchParams.get('signature')!;

    expect(() =>
      service.verify(
        'document-1',
        'customer-2',
        result.expiresAt,
        signature,
      ),
    ).toThrow(ForbiddenException);
  });

  it('should reject an expired signed URL', () => {
    const result = service.generate(
      'document-1',
      'customer-1',
    );

    const signature = new URL(
      `http://localhost${result.url}`,
    ).searchParams.get('signature')!;

    expect(() =>
      service.verify(
        'document-1',
        'customer-1',
        Math.floor(Date.now() / 1000) - 1,
        signature,
      ),
    ).toThrow('Signed URL has expired');
  });
});