import { Router } from 'express';

import { categoriesRouter } from './routes/categories.router';
import { specificationRouter } from './routes/specification.router';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specification', specificationRouter);

export { router };
