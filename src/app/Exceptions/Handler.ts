import { Request, Response } from 'express';
import IOC from 'sosise-core/build/ServiceProviders/IOC';
import LoggerService from 'sosise-core/build/Services/Logger/LoggerService';
import ExceptionResponse from 'sosise-core/build/Types/ExceptionResponse';

export default class Handler {
    /**
     * Main http exception handling method
     */
    public reportHttpException(request: Request, response: Response, exception: any): Response {
        // Instantiate logger
        const logger = IOC.make(LoggerService) as LoggerService;

        // Exception should handle it's response itself
        if (typeof exception?.handle !== 'undefined') {
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
            message: exception?.message ?? String(exception),
            data: {
                // A value thrown without a stack, e.g. a string, is reported as it is instead of crashing the handler
                stack: String(exception?.stack ?? exception)
                    .split('\n')
                    .map((element: string) => element.trim()),
            },
        };

        // Log
        logger.critical(`${exception?.constructor?.name} exception occurred`, httpResponse);

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

        // Exception should handle it's response itself
        if (typeof exception?.handle !== 'undefined') {
            // Let exception handle it's response
            const exceptionResponse: ExceptionResponse = exception.handle(exception);

            // Log
            logger.critical(`${exception.constructor.name} exception occurred`, exceptionResponse, exception.loggingChannel ?? undefined);

            // Stop at this point
            return;
        }

        // Otherwise fallback response will be sent
        // Prepare response
        const exceptionResponse: ExceptionResponse = {
            message: exception?.message ?? String(exception),
            data: {
                // A value thrown without a stack, e.g. a string, is reported as it is instead of crashing the handler
                stack: String(exception?.stack ?? exception)
                    .split('\n')
                    .map((element: string) => element.trim()),
            },
        };

        // Log
        logger.critical(`${exception?.constructor?.name} exception occurred`, exceptionResponse);
    }
}
