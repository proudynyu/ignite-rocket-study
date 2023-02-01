import { Router } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/specification";
import {
  CreateSpecificationController,
  CreateSpecificationUseCase,
} from "../modules/cars/useCases/createSpecification";

const specificationRepository = new SpecificationRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

const specificationRouter = Router();

specificationRouter.post("/", createSpecificationController.handle);

export { specificationRouter };
