import { Router } from 'express';
import { resolve } from 'node:path';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import { importCategoryController } from '../modules/cars/useCases/importCategory';

const categoriesRouter = Router();

const upload = multer({
  dest: resolve('..', '..', 'tmp'),
});

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRouter };
