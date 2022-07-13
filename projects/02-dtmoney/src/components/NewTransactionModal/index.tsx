import { FC, FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { Form, TransactionTypeContainer, RadioBox } from "./styles";
import { useTransactionsContext } from "../../contexts/TransactionsContext";

enum TransactionType {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

export const NewTransactionModal: FC<NewTransactionModalProps> = ({
  isOpenModal,
  handleCloseModal,
}) => {
  const { createTransaction } = useTransactionsContext();
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.Deposit
  );

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const transaction = {
      title,
      value: amount,
      transactionType,
      category,
    };

    await createTransaction(transaction);

    setTitle("");
    setAmount(0);
    setCategory("");
    setTransactionType(TransactionType.Deposit);

    handleCloseModal();
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={handleCloseModal}
      >
        <img src={closeImg} alt="close modal" />
      </button>

      <Form onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transaçao</h2>

        <input
          type="text"
          placeholder="titulo"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isDeposit
            isActive={transactionType === TransactionType.Deposit}
            onClick={() => setTransactionType(TransactionType.Deposit)}
          >
            <img src={incomeImg} alt="entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isDeposit={false}
            isActive={transactionType === TransactionType.Withdraw}
            onClick={() => setTransactionType(TransactionType.Withdraw)}
          >
            <img src={outcomeImg} alt="saida" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Form>
    </Modal>
  );
};
