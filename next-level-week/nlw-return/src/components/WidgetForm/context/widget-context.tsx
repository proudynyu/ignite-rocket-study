import { createContext, FC, useContext, useState } from "react";

import bugImageSrc from "../../../assets/images/bug.svg";
import ideadImageSrc from "../../../assets/images/idea.svg";
import thoughtImageSrc from "../../../assets/images/thought.svg";

const FEEDBACK_TYPES = {
  BUG: {
    title: "Problema",
    image: {
      src: bugImageSrc,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      src: ideadImageSrc,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      src: thoughtImageSrc,
      alt: "Imagem de uma nuvem de pensamento",
    },
  },
};

export type FeedbackTypeKeys = keyof typeof FEEDBACK_TYPES;
export type FeedbackType = typeof FEEDBACK_TYPES;

interface WidgetContextProps {
  feedbackTypeKeys: FeedbackTypeKeys | null;
  feedbackType: FeedbackType;
  setFeedbackTypeKeys: React.Dispatch<
    React.SetStateAction<"BUG" | "IDEA" | "OTHER" | null>
  >;
}

export const WidgetContext = createContext<WidgetContextProps>(
  {} as WidgetContextProps
);

interface WidgetProviderProps {
  children: React.ReactElement;
}

export const WidgetContextProvider: FC<WidgetProviderProps> = ({
  children,
}) => {
  const [feedbackTypeKeys, setFeedbackTypeKeys] =
    useState<FeedbackTypeKeys | null>(null);

  return (
    <WidgetContext.Provider
      value={{
        feedbackTypeKeys,
        setFeedbackTypeKeys,
        feedbackType: FEEDBACK_TYPES,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidgetContext = () => {
  const context = useContext(WidgetContext);
  return context;
};
