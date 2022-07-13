import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    if (!code)
      return response.status(401).json({
        error: "No code provided",
      });

    try {
      const service = new AuthenticateUserService();
      const result = await service.execute(code);
      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
