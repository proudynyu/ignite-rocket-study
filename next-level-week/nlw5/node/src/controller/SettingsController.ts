import { Request, Response } from 'express'
import { SettingsService } from '../services/SettingsService'

export class SettingsController {
  private settingsService = new SettingsService()

  async create(req: Request, res: Response): Promise<Response> {
    const { username, chat } = req.body

    try {
      const settings = await this.settingsService.create({ chat, username })
      return res.status(201).json(settings)
    } catch ({ message }) {
      console.log(message)
    }
  }

  // async index(req: Request, res: Response) {
  //   try {
  //     const allSettings = await this.settingRepository.find()

  //     if (!allSettings.length)
  //       res.status(400).json({ error: 'Nothing was found' })

  //     return res.status(200).json(allSettings)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // async showOne(req: Request, res: Response) {
  //   const { id } = req.params

  //   try {
  //     const oneSetting = await this.settingRepository.findOne(id)

  //     if (!oneSetting)
  //       res.status(400).json({ id: id, error: 'This setting does not exists' })

  //     return res.status(200).json(oneSetting)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // async delete(req: Request, res: Response) {
  //   const { id } = req.params

  //   try {
  //     const oneSetting = await this.settingRepository.findOne(id)

  //     if (!oneSetting)
  //       res.status(400).json({ id: id, error: 'This setting does not exists' })

  //     const response = await this.settingRepository.delete(oneSetting)
  //     return res.status(200).json(response)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}
