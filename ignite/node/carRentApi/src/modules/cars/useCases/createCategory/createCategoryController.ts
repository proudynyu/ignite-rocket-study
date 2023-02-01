import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './createCategoryUseCase';

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  public handle(req: Request, res: Response) {
    const { name, description } = req.body as ICreateCategoryDTO;

    const category = this.createCategoryUseCase.execute({ name, description });

    return res.status(201).json(category);
  }
}
