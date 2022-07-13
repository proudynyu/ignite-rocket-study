import styled from "styled-components";
import { darken, transparentize } from "polished";

export const Form = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;
    background: #e7e9ee;
    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;
    transition: 0.25s ease;

    &:hover {
      filter: brightness(1.1);
    }
  }
`;
export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;

  display: grid;

  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

interface RadioBoxProps {
  isActive: boolean;
  isDeposit: boolean;
}

enum colors {
  green = "#33cc95",
  red = "#e52e4d",
}

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  background: ${({ isActive, isDeposit }) => {
    if (isActive) {
      return isDeposit
        ? transparentize(0.85, colors.green)
        : transparentize(0.85, colors.red);
    }
    return "transparent";
  }};

  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;

  &:hover {
    border-color: ${darken(0.1, "#d7d7d7")};
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }

  img {
    width: 20px;
    height: 20px;
  }
`;
