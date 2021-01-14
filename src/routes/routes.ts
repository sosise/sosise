import express from 'express';
import { Request, Response, NextFunction } from 'express';
import IndexController from '../app/Http/Controllers/IndexController';
const router = express.Router();

// IndexController
router.get('/', (request: Request, response: Response, next: NextFunction) => {
    new IndexController().index(request, response, next);
});

export default router;
