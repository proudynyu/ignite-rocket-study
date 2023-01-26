import { Request, Response } from "express";
import { getBalance } from "src/utils/getBalance";

export class Deposit {
  public static create(req: Request, res: Response) {
    const { amount, description } = req.body as IDeposit

    const customer = res.locals.customer as Pick<IAccount, 'statement'>

    const statementOperation: IStatement = {
      description,
      amount,
      create_at: new Date(),
      type: 'credit'
    }

    customer.statement.push(statementOperation)

    return res.status(201).send()
  }

  public static withdraw(req: Request, res: Response) {
    const { amount } = req.body as Pick<IDeposit, 'amount'>

    const customer = res.locals.customer as Pick<IAccount, 'statement'>

    const customerBalance = getBalance(customer.statement)

    if (amount > customerBalance) {
      return res.status(400).json({
        error: 'Insufficient funds'
      })
    }

    const statementOperation: IStatement = {
      amount,
      create_at: new Date(),
      type: 'withdraw'
    }

    customer.statement.push(statementOperation)

    return res.status(201).send()
  }
}