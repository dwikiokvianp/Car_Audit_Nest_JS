import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../users/user.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    return next.handle().pipe(
      map((data: User[]) => {
        return data.map((hello) => {
          return { id: hello.id, email: hello.email };
        });
      }),
    );
  }
}
