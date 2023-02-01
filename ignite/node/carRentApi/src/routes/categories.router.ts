import { Router } from "express";

import { CategoriesRepositories } from "../modules/cars/repositories/category";
import {
  CreateCategoryUseCase,
  CreateCategoryController,
} from "../modules/cars/useCases/createCategory";
import {
  ListCategoriesController,
  ListCategoriesUseCase,
} from "../modules/cars/useCases/listCategories";

const categoriesRouter = Router();

const categoryRepo = new CategoriesRepositories();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

const listCategoryUsecase = new ListCategoriesUseCase(categoryRepo);
const listCategoriesController = new ListCategoriesController(
  listCategoryUsecase
);

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.get("/", listCategoriesController.handle);

export { categoriesRouter };
