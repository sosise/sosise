import express from 'express';
import { NextFunction, Request, Response } from 'express';
import IndexController from '../app/Http/Controllers/IndexController';
import DocumentationBasicAuthMiddleware from 'sosise-core/build/Middlewares/DocumentationBasicAuthMiddleware';

const router = express.Router();

// IndexController
const indexController = new IndexController();
router.get('/', (request: Request, response: Response, next: NextFunction) => {
    indexController.index(request, response, next);
});

// Documentation
const documentationBasicAuthMiddleware = new DocumentationBasicAuthMiddleware();
router.use('/docs', [documentationBasicAuthMiddleware.handle, express.static(process.cwd() + '/docs', { index: 'index.html' })]);

export default router;
