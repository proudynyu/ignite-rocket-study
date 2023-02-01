import { categoriesRepository } from '../../repositories/category';
import { CreateCategoryController } from './createCategoryController';
import { CreateCategoryUseCase } from './createCategoryUseCase';

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
export const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);
