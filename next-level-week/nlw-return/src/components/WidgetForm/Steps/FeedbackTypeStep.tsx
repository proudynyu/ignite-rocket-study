import { FC } from "react";

import { FeedbackTypeKeys, useWidgetContext } from "../context/widget-context";

export const FeedbackTypeStep: FC = () => {
  const { feedbackType, setFeedbackTypeKeys } = useWidgetContext();

  return (
    <div className="flex py-8 gap-2 w-full">
      {Object.entries(feedbackType).map(([key, { image, title }]) => (
        <button
          key={key}
          className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
          onClick={() => setFeedbackTypeKeys(key as FeedbackTypeKeys)}
        >
          <img src={image.src} alt={image.alt} />
          <span>{title}</span>
        </button>
      ))}
    </div>
  );
};
