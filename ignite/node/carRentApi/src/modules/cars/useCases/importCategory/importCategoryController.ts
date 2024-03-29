import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase){}

  handle(req: Request, res: Response) {
    const { file } = req
    this.importCategoryUseCase.execute(file)
    return res.send()
  }
}