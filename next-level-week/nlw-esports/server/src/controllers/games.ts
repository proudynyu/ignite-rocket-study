import { Request, Response } from "express";
import { prismaClient } from "@services/prisma";

export class Games {
  public static async getGames(req: Request, res: Response) {
    const games = await prismaClient.game.findMany()
    return res.status(200).json(games)
  }
}