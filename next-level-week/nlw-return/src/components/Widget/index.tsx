import { ChatTeardropDots } from "phosphor-react";
import { useState } from "react";
import { WidgetFormWrapper } from "../WidgetForm";

export function Widget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleWidgetVisibility() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-end">
      {isOpen && <WidgetFormWrapper handleClose={toggleWidgetVisibility}/>}

      <button
        className="flex items-center bg-brand-500 rounded-full px-2 h-12 text-white group"
        onClick={toggleWidgetVisibility}
      >
        <ChatTeardropDots className="w-8 h-8" />

        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear flex items-center">
          <span className="pl-2 text-s">Feedback</span>
        </span>
      </button>
    </div>
  );
}
