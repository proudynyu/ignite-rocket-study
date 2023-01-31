import { Router, Request, Response } from "express";

import { CategoriesRepositories } from "../modules/cars/repositories/category";
import { Categories } from "../modules/cars/services/category";

const categoriesRouter = Router();

const categoryRepo = new CategoriesRepositories();
const categories = new Categories(categoryRepo);

categoriesRouter.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body as ICreateCategoryDTO;

  const category = categories.create({ name, description });

  return res.status(201).json(category);
});

categoriesRouter.get("/", (_: Request, res: Response) => {
  return res.status(200).json(categories.list());
});

export { categoriesRouter };
