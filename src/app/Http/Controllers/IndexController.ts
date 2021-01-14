import { Request, Response, NextFunction } from 'express';
import HttpResponse from 'sosise-core/build/Types/HttpResponse';

export default class IndexController {
    /**
     * Example method
     */
    public async index(request: Request, response: Response, next: NextFunction) {
        try {
            // Prepare http response
            const httpResponse: HttpResponse = {
                code: 1000,
                message: 'Some example message',
                data: null
            };

            // Send response
            return response.send(httpResponse);
        } catch (error) {
            next(error);
        }
    }
}
