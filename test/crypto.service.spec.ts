import { CryptoService } from '../src/crypto/crypto.service';
import { RSA_PRIVATE_KEY, RSA_PUBLIC_KEY } from '../src/crypto/rsa.keys';

describe('CryptoService (unit)', () => {
  let service: CryptoService;

  beforeAll(() => {
    if (!RSA_PRIVATE_KEY || !RSA_PUBLIC_KEY) {
      throw new Error('RSA keys are not configured in rsa.keys.ts');
    }
    service = new CryptoService();
  });

  it('should encrypt and decrypt payload correctly with hybrid RSA+AES flow', () => {
    const payload = 'Hello world! 12345 - Hybrid RSA + AES test';

    const encrypted = service.encryptPayload(payload);

    expect(encrypted.data1).toBeDefined();
    expect(encrypted.data2).toBeDefined();
    expect(typeof encrypted.data1).toBe('string');
    expect(typeof encrypted.data2).toBe('string');
    expect(encrypted.data1.length).toBeGreaterThan(0);
    expect(encrypted.data2.length).toBeGreaterThan(0);
    expect(encrypted.data1).not.toEqual(encrypted.data2);

    const decrypted = service.decryptPayload(encrypted.data1, encrypted.data2);

    expect(decrypted.payload).toBe(payload);
  });

  it('should fail to decrypt if data2 is tampered', () => {
    const payload = 'Sensitive payload';

    const encrypted = service.encryptPayload(payload);

    const brokenData2 = encrypted.data2.slice(0, -4) + 'ABCD';

    expect(() =>
      service.decryptPayload(encrypted.data1, brokenData2),
    ).toThrow();
  });
});
