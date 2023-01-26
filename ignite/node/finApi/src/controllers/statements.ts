import { Request, Response } from "express"

export class Statement {
  public static getAll(req: Request, res: Response) {
    const customer = res.locals.customer
    return res.status(200).json(customer)
  }

  public static getUniqueByDate(req: Request, res: Response) {
    const customer = res.locals.customer as Pick<IAccount, 'statement'>
    const { date } = req.query

    const dateFormatted = new Date(date + " 00:00")

    const statements = customer.statement.filter(state => {

      return state.create_at.toDateString() === new Date(dateFormatted).toDateString()
    })

    if (!statements.length) {
      return res.status(400).json({
        error: 'Cannot find any statement for this date'
      })
    }

    return res.status(200).json(statements)
  }
}