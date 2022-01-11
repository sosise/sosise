import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import LoggerService from 'sosise-core/build/Services/Logger/LoggerService';
import ExceptionResponse from 'sosise-core/build/Types/ExceptionResponse';
import sentryConfig from '../../config/sentry';
import IOC from 'sosise-core/build/ServiceProviders/IOC';

export default class Handler {
    /**
     * Main http exception handling method
     */
    public reportHttpException(request: Request, response: Response, exception: any): Response {
        // Instantiate logger
        const logger = IOC.make(LoggerService) as LoggerService;

        // Exception should handle it's response itself
        if (typeof exception.handle !== "undefined") {
            // Let exception handle it's response
            const exceptionResponse: ExceptionResponse = exception.handle(exception);

            // Log
            logger.critical(`${exception.constructor.name} exception occurred`, exceptionResponse, exception.loggingChannel ?? undefined);

            // Response
            return response.status(exceptionResponse.httpCode || 500).send(exceptionResponse);
        }

        // Otherwise fallback response will be sent
        // Prepare response
        const httpResponse: ExceptionResponse = {
            code: 2000,
            httpCode: 500,
            message: exception.message,
            data: {
                stack: exception.stack.split('\n').map((element) => element.trim())
            }
        };

        // Log
        logger.critical(`${exception.constructor.name} exception occurred`, httpResponse);

        // When in production or staging mode, modify the response
        // Hide all sensitive information
        if (process.env.APP_ENV !== 'local') {
            httpResponse.data = null;
            httpResponse.message = 'Server error';
        }

        // Send response
        return response.status(httpResponse.httpCode!).send(httpResponse);
    }

    /**
     * Main command exception handling method
     */
    public async reportCommandException(exception: any): Promise<void> {
        // Instantiate logger
        const logger = IOC.make(LoggerService) as LoggerService;

        // Check if exception should be sent to sentry
        if (exception.sendToSentry !== undefined && exception.sendToSentry === true) {
            // Send exception to sentry
            Sentry.init({
                environment: process.env.APP_ENV,
                dsn: sentryConfig.dsn,
                tracesSampleRate: 1.0,
            });
            Sentry.captureException(exception);
            await Sentry.flush();
        }

        // Exception should handle it's response itself
        if (typeof exception.handle !== "undefined") {
            // Let exception handle it's response
            const exceptionResponse: ExceptionResponse = exception.handle(exception);

            // Log
            logger.critical(`${exception.constructor.name} exception occurred`, exceptionResponse, exception.loggingChannel ?? undefined);

            // Stop at this point
            return;
        }

        // Otherwise fallback response will be sent
        // Prepare response
        const response: ExceptionResponse = {
            message: exception.message,
            data: {
                stack: exception.stack.split('\n').map((element) => element.trim())
            }
        };

        // Log
        logger.critical(`${exception.constructor.name} exception occurred`, response);
    }
}
