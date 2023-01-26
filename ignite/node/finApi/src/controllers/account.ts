import { Request, Response } from "express"
import { v4 } from 'uuid'

import { fakeDb } from "src/constants"
import { getBalance } from "src/utils/getBalance"

export class Account {
  public static create(req: Request, res: Response) {
    const { cpf, name } = req.body as IAccount

    const cpfAlreadyExists = fakeDb.some(fake => fake.cpf === cpf)

    if (cpfAlreadyExists) {
      return res.status(400).json({
        error: 'Account already exists with this CPF'
      })
    }

    const client = {
      id: v4(),
      cpf,
      name
    }

    fakeDb.push(client)

    return res.status(201).json({ cpf, name })
  }

  public static update(req: Request, res: Response) {
    const { name } = req.body as Pick<IAccount, 'name'>
    const customer = res.locals.customer as Pick<IAccount, 'name'>

    customer.name = name

    return res.status(201).json({
      message: 'Name updated with success',
      name
    })
  }

  public static get(req: Request, res: Response) {
    const customer = res.locals.customer as IAccount
    return res.status(200).json(customer)
  }

  public static delete(req: Request, res: Response) {
    const customer = res.locals.customer as IAccount

    const customerIndex = fakeDb.indexOf(customer)

    fakeDb.splice(customerIndex, 1)

    return res.status(200).send()
  }

  public static getBalance(req: Request, res: Response) {
    const customer = res.locals.customer as IAccount
    const balance = getBalance(customer.statement)
    return res.status(200).json(balance)
  }
}