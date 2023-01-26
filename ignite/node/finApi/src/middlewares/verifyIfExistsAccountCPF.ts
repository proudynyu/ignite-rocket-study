import { NextFunction, Request, Response } from "express";

import { fakeDb } from "src/constants";

/**
 * @exports
 * @function
 * @description function/middleware responsable to identify if the account exists on the DB
 * @param req request from express
 * @param res response from express
 * @param next calls the next function
 * @version 1.0.0
 */
export function verifyIfExistsAccountCPF(req: Request, res: Response, next: NextFunction) {
  const { cpf } = req.headers

  const customer = fakeDb.find(customer => customer.cpf === cpf)

  if (!customer) {
    return res.status(400).json({
      error: "Customer does not exist"
    })
  }

  res.locals.customer = customer

  return next()
}