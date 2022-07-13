import { Request, Response } from 'express'
import { CreateMessageService } from '../services/CreateMessageService'

export class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { message } = request.body

    if (!message)
      return response.status(401).json({
        error: "No message provided",
      });

    const { user_id } = request

    const service = new CreateMessageService()

    const result = await service.execute(message, user_id)

    return response.json(result)
  }
}