interface TransactionsContext {
  transactions: TransactionsProps[]
  createTransaction: (transaction: TransactionFormProps) => Promise<void>
}