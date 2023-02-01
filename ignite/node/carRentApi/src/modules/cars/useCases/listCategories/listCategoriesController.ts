import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './listCategoriesUseCase';

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  public handle(_: Request, res: Response) {
    return res.status(200).json(this.listCategoriesUseCase.execute());
  }
}
