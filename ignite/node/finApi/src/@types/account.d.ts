interface IStatement {
  description?: string,
  amount: number,
  create_at: Date
  type: 'credit' | 'withdraw'
}

interface IAccount {
  cpf: string
  name: string
  id: string
  statement?: IStatement[]
}
