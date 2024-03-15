import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

// 异常过滤器
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorMsg = exception.getResponse();

    response.status(status).json(
      typeof errorMsg === 'object'
        ? {
            ...errorMsg,
          }
        : {
            code: status,
            msg: errorMsg || 'error',
            data: null,
          },
    );
  }
}
