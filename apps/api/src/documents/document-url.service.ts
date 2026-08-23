import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';

@Injectable()
export class DocumentUrlService {
  private readonly secret =
    process.env.DOCUMENT_URL_SECRET ||
    'upna-loan-document-dev-secret';

  private readonly ttlSeconds = Number(
    process.env.DOCUMENT_URL_TTL_SECONDS || 600,
  );

  generate(
    documentId: string,
    customerId: string,
  ) {
    const expiresAt =
      Math.floor(Date.now() / 1000) +
      this.ttlSeconds;

    const payload = `${documentId}.${customerId}.${expiresAt}`;

    const signature = this.sign(payload);

    return {
      expiresAt,
      url: `/api/v1/documents/${documentId}/download?customerId=${encodeURIComponent(
        customerId,
      )}&expires=${expiresAt}&signature=${signature}`,
    };
  }

  verify(
    documentId: string,
    customerId: string,
    expires: number,
    signature: string,
  ) {
    if (
      !documentId ||
      !customerId ||
      !expires ||
      !signature
    ) {
      throw new ForbiddenException(
        'Invalid signed URL',
      );
    }

    const now = Math.floor(Date.now() / 1000);

    if (expires < now) {
      throw new ForbiddenException(
        'Signed URL has expired',
      );
    }

    const payload = `${documentId}.${customerId}.${expires}`;
    const expected = this.sign(payload);

    const receivedBuffer =
      Buffer.from(signature, 'hex');
    const expectedBuffer =
      Buffer.from(expected, 'hex');

    if (
      receivedBuffer.length !==
      expectedBuffer.length ||
      !timingSafeEqual(
        receivedBuffer,
        expectedBuffer,
      )
    ) {
      throw new ForbiddenException(
        'Invalid signed URL',
      );
    }

    return true;
  }

  private sign(payload: string) {
    return createHmac(
      'sha256',
      this.secret,
    )
      .update(payload)
      .digest('hex');
  }
}