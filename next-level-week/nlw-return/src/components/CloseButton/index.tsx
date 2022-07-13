import { X } from "phosphor-react";
import { FC } from "react";

interface Props {
  handleClose: () => void;
}

export const CloseButton: FC<Props> = ({ handleClose }) => {
  return (
    <button
      onClick={handleClose}
      className="top-5 right-5 absolute text-zinc-400 hover:text-zinc-100"
      title="Fechar formulário de feedback"
    >
      <X weight="bold" className="w-4 h-4" />
    </button>
  );
};
