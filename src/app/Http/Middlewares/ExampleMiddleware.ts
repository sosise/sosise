import { NextFunction, Request, Response } from "express";

export default class ExampleMiddleware {
    /**
     * This method handles the middleware
     */
    public async handle(request: Request, response: Response, next: NextFunction): Promise<any> {
        // Before
        next();
        // After
    }
}
