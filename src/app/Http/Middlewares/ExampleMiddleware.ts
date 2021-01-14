import { Request, Response, NextFunction } from 'express';

export default class ExampleMiddleware {
    /**
     * This method handles the middleware
     */
    public handle(request: Request, response: Response, next: NextFunction): void {
        // Before
        next();
        // After
    }
}
