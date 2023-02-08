import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginStrategy as LoginNewV2Strategy } from '../strategies/login.strategy';

/*
  dev note:
  UseGuards(AuthGuard), or UseGuards(LoginAuthGuard) in our case,
  calls this.canActivate (see AuthGuard class)
  which calls validate in our stategy
  we could write a custom canActivate here
*/

@Injectable()
export class LoginAuthGuard extends AuthGuard('local') {
  constructor() {
    super({ defaultStrategy: LoginNewV2Strategy });
  }
}
