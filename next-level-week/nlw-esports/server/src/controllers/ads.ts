import { prismaClient } from "@services/prisma";
import { convertHoursStringToMinutes } from "@utils/convertHoursStringToMinutes";
import { convertMinutesToHourString } from "@utils/convertMinutesToHourString";
import { Request, Response } from "express";

export class Ads {
  public static async getAdsByGameId(req: Request, res: Response) {
    const gameId = req.params.id as string;

    const ads = await prismaClient.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourEnd: true,
        hourStart: true,
      },
      where: {
        gameId: gameId,
      },
      orderBy: {
        creataAt: "desc",
      },
    });

    return res.status(200).json(
      ads.map((ad) => ({
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd)
      }))
    );
  }

  public static async createAds(req: Request, res: Response) {
    const gameId = req.params.gameId
    const requestBody = req.body as Ad
    
    const createdAd = await prismaClient.ad.create({
      data: {
        gameId,
        name: requestBody.name,
        yearsPlaying: requestBody.yearsPlaying,
        discord: requestBody.discord,
        weekDays: requestBody.weekDays.join(','),
        hourStart: convertHoursStringToMinutes(requestBody.hourStart),
        hourEnd: convertHoursStringToMinutes(requestBody.hourEnd),
        useVoiceChannel: requestBody.useVoiceChannel,
      }
    })
    return res.status(201).json(createdAd)
  }

  public static async getUserDiscordInAd(req: Request, res: Response) {
    const adId = req.params.id as string;

    const ad = await prismaClient.ad.findUniqueOrThrow({
      where: {
        id: adId,
      },
      select: {
        discord: true,
      },
    });

    return res.status(200).json({
      discord: ad.discord,
    });
  }
}
