import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

// TODO this and login strategy are the same, dedup??

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {}
