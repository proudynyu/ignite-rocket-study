interface TransactionsProps {
  id: number
  title: string
  value: number
  category: string
  transactionType: string
  createdAt: Date
}

interface NewTransactionModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
}

type TransactionFormProps = Omit<TransactionsProps, 'id' | 'createdAt'>