import { FC } from "react";
import { Container } from "./styles";
import { formatCurrency, formatDate } from "../../utils";
import { useTransactionsContext } from "../../contexts/TransactionsContext";

export const TransactionTable: FC = () => {
  const { transactions } = useTransactionsContext();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            ({ id, title, category, value, transactionType, createdAt }) => (
              <tr key={id}>
                <td className="title">{title}</td>
                <td className={transactionType}>{formatCurrency(value)}</td>
                <td>{category}</td>
                <td>{formatDate(new Date(createdAt))}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Container>
  );
};
