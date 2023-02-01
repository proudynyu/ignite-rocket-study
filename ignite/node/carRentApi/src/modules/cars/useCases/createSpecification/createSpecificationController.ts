import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './createSpecificationUseCase';

export class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  public handle(req: Request, res: Response) {
    const { description, name } = req.body as ISpecificationDTO;
    const specification = this.createSpecificationUseCase.execute({
      description,
      name,
    });

    return res.status(201).json(specification);
  }
}
