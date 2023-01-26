import { Router } from 'express'

import { Account } from './controllers/account'
import { Deposit } from './controllers/deposit'
import { Statement } from './controllers/statements'
import { verifyIfExistsAccountCPF } from './middlewares/verifyIfExistsAccountCPF'

const routes = Router()

routes.post('/account', Account.create)
routes.get('/account', verifyIfExistsAccountCPF, Account.get)
routes.put('/account', verifyIfExistsAccountCPF, Account.update)
routes.get('/balance', verifyIfExistsAccountCPF, Account.getBalance)

routes.get('/statement', verifyIfExistsAccountCPF, Statement.getAll)
routes.get('/statement/:date', verifyIfExistsAccountCPF, Statement.getUniqueByDate)

routes.post('/deposit', verifyIfExistsAccountCPF, Deposit.create)
routes.post('/withdraw', verifyIfExistsAccountCPF, Deposit.withdraw)

export default routes
