import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger  = new Logger(AllExceptionFilter.name);
    catch(exception: unknown, host: ArgumentsHost) {
        const httpController = host.switchToHttp();
        const response = httpController.getResponse<Response>();
        const request = httpController.getRequest<Request>();

        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof HttpException ? exception.getResponse() : "Internal Server Error";

        const status = HttpStatus[statusCode];
            // for debugging
    // this.logger.error(
    //   `[${request.method}] ${request.url} - ${statusCode} - ${message}`,

    // );
        response.status(statusCode).json({
            error : "Internal Server Error",
            message: message ,
            status : status,
            options : null
        });
    }
}
