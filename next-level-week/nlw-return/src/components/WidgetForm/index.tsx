import { FC } from "react";
import { WidgetContextProvider } from "./context/widget-context";
import { WidgetForm } from "./WidgetForm";

interface Props {
  handleClose: () => void;
}

export const WidgetFormWrapper: FC<Props> = ({ handleClose }) => {
  return (
    <WidgetContextProvider>
      <WidgetForm handleClose={handleClose} />
    </WidgetContextProvider>
  );
};
