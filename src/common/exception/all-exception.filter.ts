import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const httpController = host.switchToHttp();
    const response = httpController.getResponse<Response>();
    const request = httpController.getRequest<Request>();

    if (exception instanceof mongoose.MongooseError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        error: 'Bad Request',
        message: exception.message,
        status: HttpStatus.BAD_REQUEST,
        options: null,
      });
    }

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';
    const error =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    const status = HttpStatus[statusCode];
    // for debugging
    // this.logger.error(
    //   `[${request.method}] ${request.url} - ${statusCode} - ${message}`,

    // );
    response.status(statusCode).json({
      error: error,
      message: message,
      status: status,
      options: null,
    });
  }
}
