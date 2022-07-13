import { Request, Response } from "express";
import { GetLastThreeMessageService } from "../services/GetLastThreeMessagesService";

export class GetLastThreeMessageController {
  async handle(req: Request, res: Response) {
    const service = new GetLastThreeMessageService()

    const result = await service.execute()

    return res.json(result)
  }
}