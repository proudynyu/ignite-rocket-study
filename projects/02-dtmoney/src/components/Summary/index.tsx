import { FC } from "react";
import { useTransactionsContext } from "../../contexts/TransactionsContext";
import { formatCurrency } from "../../utils";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

import { Container } from "./styles";

export const Summary: FC = () => {
  const { transactions } = useTransactionsContext();

  const incomes = transactions.filter(
    (transaction) => transaction.transactionType === "deposit"
  );
  const outcomes = transactions.filter(
    (transaction) => transaction.transactionType === "withdraw"
  );

  const incomesTotal = incomes.reduce((sum, current) => sum + current.value, 0);
  const outcomesTotal = outcomes.reduce(
    (sum, current) => sum + current.value,
    0
  );

  const total = incomesTotal - outcomesTotal;

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="entradas" />
        </header>
        <strong>{formatCurrency(incomesTotal)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="saidas" />
        </header>
        <strong>{formatCurrency(outcomesTotal)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </Container>
  );
};
