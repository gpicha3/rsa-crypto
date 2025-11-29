import { Injectable } from '@nestjs/common';
import { RSA_PRIVATE_KEY, RSA_PUBLIC_KEY } from './rsa.keys';

import * as crypto from 'crypto';
import { DecryptDataResultDto } from 'src/common/dto/common/dto/decrypt-data.dto';
import { EncryptDataResultDto } from 'src/common/dto/common/dto/encrypt-data.dto';

@Injectable()
export class CryptoService {
  encryptPayload(payload: string): EncryptDataResultDto {
  const aesKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);
  const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  const data2 = Buffer.concat([iv, tag, encrypted]).toString('base64');

  const encryptedKey = crypto.privateEncrypt(
    {
      key: RSA_PRIVATE_KEY,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    aesKey,
  );
  const data1 = encryptedKey.toString('base64');

  return { data1, data2 };
}

decryptPayload(data1: string, data2: string): DecryptDataResultDto {
  const aesKey = crypto.publicDecrypt(
    {
      key: RSA_PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(data1, 'base64'),
  );

  const buf = Buffer.from(data2, 'base64');
  const iv = buf.subarray(0, 16);
  const tag = buf.subarray(16, 32);
  const encrypted = buf.subarray(32);

  const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return { payload: decrypted.toString('utf8') };
}

}
