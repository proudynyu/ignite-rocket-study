import "dotenv/config";

import { Router, Request, Response } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateMessageController } from "../controllers/CreateMessageController";
import { GetLastThreeMessageController } from "../controllers/GetLastThreeMessageController";
import { ProfileUserController } from "../controllers/ProfileUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const routes = Router();

routes.get("/github", (req: Request, res: Response) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

routes.get("/signin/callback", (req: Request, res: Response) => {
  const { code } = req.query
  return res.json(code)
});

routes.post('/authenticate', new AuthenticateUserController().handle)
routes.get('/messages/last-three', new GetLastThreeMessageController().handle)

routes.post('/messages', ensureAuthenticated, new CreateMessageController().handle)
routes.get('/profile', ensureAuthenticated, new ProfileUserController().handle)

export { routes };
