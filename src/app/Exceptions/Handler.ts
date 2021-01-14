import { Request, Response } from 'express';
import ResponseType from '../Types/Response/ResponseType';
import * as Sentry from '@sentry/node';
import IOC from '../Libraries/IOC/IOC';
import LoggerService from '../Services/Logger/LoggerService';

export default class Handler {
    /**
     * Main http exception handling method
     */
    public reportHttpException(request: Request, response: Response, exception: any): Response {
        // Instantiate logger
        const logger = IOC.make('LoggerService') as LoggerService;

        // Exception should handle it's response itself
        if (typeof exception.handle !== "undefined") {
            const exceptionHandleResponseType: ResponseType = exception.handle(exception);
            return response.status(exceptionHandleResponseType.httpCode || 500).send(exceptionHandleResponseType);
        }

        // Otherwise fallback response will be sent
        // Prepare response
        const responseType: ResponseType = {
            code: 100,
            httpCode: 500,
            message: exception.message,
            data: {
                stack: exception.stack.split('\n')
            }
        };

        // Log
        logger.error('Exception occured', responseType);

        // When in production or staging mode, modify the response
        if (process.env.APP_ENV !== 'local') {
            responseType.data = null;
            responseType.message = 'Server error';
        }

        // Send response
        return response.status(responseType.httpCode!).send(responseType);
    }

    /**
     * Main command exception handling method
     */
    public reportCommandException(exception: any): void {
        // Instantiate logger
        const logger = IOC.make('LoggerService') as LoggerService;

        // Send exception to sentry
        Sentry.init({
            dsn: process.env.SENTRY_DSN || undefined,
            tracesSampleRate: 1.0,
        });
        Sentry.captureException(exception);

        // Exception should handle it's response itself
        if (typeof exception.handle !== "undefined") {
            const exceptionHandleResponseType: ResponseType = exception.handle(exception);
            // Log
            logger.error('Exception occured', exceptionHandleResponseType);
            return;
        }

        // Otherwise fallback response will be sent
        // Prepare response
        const responseType: ResponseType = {
            code: 100,
            message: exception.message,
            data: {
                stack: exception.stack.split('\n')
            }
        };

        // Log
        logger.error('Exception occured', responseType);
    }
}
