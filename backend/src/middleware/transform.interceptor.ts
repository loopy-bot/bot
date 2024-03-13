import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// 响应包装
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const request = context.switchToHttp().getRequest();
    // // 对请求对象进行处理，例如记录日志
    // console.log('Request-transform:', request.method, request.url, '\n');

    // Observer观察
    return next.handle().pipe(
      map((data) => {
        // console.log('Response-transform:', data,'\n');
        return {
          code: 200,
          msg: 'success',
          data,
        };
      }),
    );
  }
}
