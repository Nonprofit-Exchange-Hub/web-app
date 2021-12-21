import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';


type Test = boolean
@Injectable()
export class CookieAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): Promise<boolean> | boolean | Observable<boolean> {
    console.log('\n\n');
    console.log('handleRequest', context);
    console.log('req', context.switchToHttp().getRequest());
    console.log('\n\n');
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
    const test = super.handleRequest(err, user, info, context, status);
    console.log('\n\n');
    console.log('handleRequest', test);
    console.log('\n\n');
    return test;
  }
}
