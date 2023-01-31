import { Request, Router, Response } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/specification";
import { SpecificationService } from "../modules/cars/services/specification";

const specificationRepository = new SpecificationRepository();
const specificationService = new SpecificationService(specificationRepository);

const specificationRouter = Router();

specificationRouter.post("/", (req: Request, res: Response) => {
  const { description, name } = req.body as ISpecificationDTO;
  const specification = specificationService.create({ description, name });

  return res.status(201).json(specification)
});

export { specificationRouter };
