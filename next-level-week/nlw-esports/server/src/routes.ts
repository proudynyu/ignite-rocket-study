import { Request, Response, Router } from "express";

import { Ads } from "./controllers/ads";
import { Games } from "./controllers/games";

export const router = Router();

router.get("/games", Games.getGames);

router.get("/games/:id/ads", Ads.getAdsByGameId);
router.get("/ads/:id/discord", Ads.getUserDiscordInAd);
router.post("/games/:gameId/ads", Ads.createAds);
