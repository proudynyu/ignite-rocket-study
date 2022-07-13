import { FC } from "react";
import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionsTable";

import { Container } from "./styles";

export const Dashboard: FC = () => {
  return (
    <Container>
      <Summary />
      <TransactionTable />
    </Container>
  );
};
