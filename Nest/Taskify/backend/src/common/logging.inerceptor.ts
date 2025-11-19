import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const { method, url, body, params, query } = request;
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        console.log(
          `✅ ${method} ${url} completed in ${responseTime}ms`,
        );
      }),
    );
  }
}
