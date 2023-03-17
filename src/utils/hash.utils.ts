import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'node:crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashUtils {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
