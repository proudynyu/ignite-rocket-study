import { Request, Response, Router } from 'express'

export const router = Router()

router.get('/games', (req: Request, res: Response) => {
  return res.status(200).json([])
})

router.post('/ads', (req: Request, res: Response) => {
  return res.status(201).json([])
})

router.get('/games/:id/ads', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Hello there!'
  })
})

router.get('/ads/:id/discord', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Hello there!'
  })
})

