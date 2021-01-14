import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import IOC from '../ServiceProviders/IOC';
import LoggerService from 'sosise-core/build/Services/Logger/LoggerService';
import ExceptionResponse from 'sosise-core/build/Types/ExceptionResponse';
import sentryConfig from '../../config/sentry';

export default class Handler {
    /**
     * Main http exception handling method
     */
    public reportHttpException(request: Request, response: Response, exception: any): Response {
        // Instantiate logger
        const logger = IOC.make('LoggerService') as LoggerService;

        // Exception should handle it's response itself
        if (typeof exception.handle !== "undefined") {
            const exceptionResponse: ExceptionResponse = exception.handle(exception);
            return response.status(exceptionResponse.httpCode || 500).send(exceptionResponse);
        }

        // Otherwise fallback response will be sent
        // Prepare response
        const httpResponse: ExceptionResponse = {
            code: 2000,
            httpCode: 500,
            message: exception.message,
            data: {
                stack: exception.stack.split('\n')
            }
        };

        // Log
        logger.error('Exception occured', httpResponse);

        // When in production or staging mode, modify the response
        // Hide all sensitive information
        if (process.env.APP_ENV !== 'local') {
            httpResponse.data = null;
            httpResponse.message = 'Server error';
        }

        // Send response
        return response.status(httpResponse.httpCode).send(httpResponse);
    }

    /**
     * Main command exception handling method
     */
    public reportCommandException(exception: any): void {
        // Instantiate logger
        const logger = IOC.make('LoggerService') as LoggerService;

        // Send exception to sentry
        Sentry.init({
            dsn: sentryConfig.dsn,
            tracesSampleRate: 1.0,
        });
        Sentry.captureException(exception);

        // Exception should handle it's response itself
        if (typeof exception.handle !== "undefined") {
            const exceptionResponse: ExceptionResponse = exception.handle(exception);
            // Log
            logger.error('Exception occured', exceptionResponse);
            return;
        }

        // Otherwise fallback response will be sent
        // Prepare response
        const response: ExceptionResponse = {
            code: 2000,
            message: exception.message,
            data: {
                stack: exception.stack.split('\n')
            }
        };

        // Log
        logger.error('Exception occured', response);
    }
}
