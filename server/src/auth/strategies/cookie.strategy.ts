import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {
  async validate(): Promise<any> {
    // all validation handled in guard
    return true;
  }
}
