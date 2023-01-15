import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginV2Strategy as LoginNewV2Strategy } from '../strategies/loginv2.strategy';

/*
  dev note:
  UseGuards(AuthGuard), or UseGuards(LoginAuthGuard) in our case,
  calls this.canActivate (see AuthGuard class)
  which calls validate in our stategy
  we could write a custom canActivate here
*/

@Injectable()
export class LoginNewV2AuthGuard extends AuthGuard('local') {
  constructor() {
    super({ defaultStrategy: LoginNewV2Strategy });
  }
}
