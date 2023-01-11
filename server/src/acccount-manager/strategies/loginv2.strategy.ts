import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccountManagerService } from '../account-manager.service';

@Injectable()
export class LoginV2Strategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AccountManagerService) {
    // Change the expected validation field from username to email
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    return user;
  }
}
