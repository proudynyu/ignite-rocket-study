import { createContext, FC, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const TransactionsContext = createContext({} as TransactionsContext);

export const TransactionsProvider: FC = ({ children }) => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  async function createTransaction(transaction: TransactionFormProps) {
    const { data } = await api.post<{ transaction: TransactionsProps }>(
      "/transactions",
      { ...transaction, createdAt: new Date() }
    );
    setTransactions([...transactions, data.transaction]);
  }

  useEffect(() => {
    api
      .get("/transactions")
      .then((resp) => setTransactions(resp.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);
  if (!Object.values(context).length) {
    throw new Error(
      "useTransactionsContext must be used inside the TransactionsContext"
    );
  }

  return context;
};
