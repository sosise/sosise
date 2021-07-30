import { Request, Response, NextFunction } from 'express';
import documentationConfig from '../../../config/documentation';

export default class DocumentationBasicAuthMiddleware {
    /**
     * This method handles the middleware
     */
    public async handle(request: Request, response: Response, next: NextFunction): Promise<any> {
        if (documentationConfig.basicAuth.enabled === false) {
            next();
        } else {
            // Do not allow if basic auth user or password are not set in the .env
            if (!documentationConfig.basicAuth.user || !documentationConfig.basicAuth.pass) {
                response.status(500).send('Basic auth username or password not set, please contact administrator');
                return;
            }

            // If authorization header is not present, dont allow
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                response.set('WWW-Authenticate', 'Basic').status(401).send('Unauthorized');
                return;
            }

            // Get username and password from request
            const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
            const user = auth[0];
            const pass = auth[1];

            // Check for username and password
            if (user === documentationConfig.basicAuth.user && pass === documentationConfig.basicAuth.pass) {
                next();
            } else {
                response.set('WWW-Authenticate', 'Basic').status(401).send('Unauthorized');
                return;
            }
        }
    }
}
