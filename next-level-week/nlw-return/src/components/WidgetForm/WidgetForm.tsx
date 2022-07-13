import { FC } from "react";

import { CloseButton } from "../CloseButton";
import { useWidgetContext } from "./context/widget-context";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

interface Props {
  handleClose: () => void;
}

export const WidgetForm: FC<Props> = ({ handleClose }) => {
  const { feedbackTypeKeys } = useWidgetContext();

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton handleClose={handleClose} />
      </header>

      {!feedbackTypeKeys ? <FeedbackTypeStep /> : <FeedbackContentStep />}

      <footer className="text-xs text-neutral-400">
        Feito com ❤ pela{" "}
        <a className="underline underline-offset-2" href="#">
          Rocketseat
        </a>
      </footer>
    </div>
  );
};
