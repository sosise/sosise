import { Request, Response, NextFunction } from 'express';

export default class IndexController {
    /**
     * Index
     */
    public async index(request: Request, response: Response, next: NextFunction) {
        try {
            // Prepare response
            const responseType: ResponseType = {
                code: 1000,
                message: 'Example message',
                data: null
            };

            // Send response
            return response.send(responseType);
        } catch (error) {
            next(error);
        }
    }
}
