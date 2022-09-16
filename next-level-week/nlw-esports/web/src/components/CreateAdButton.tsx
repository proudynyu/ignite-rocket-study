import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export const CreateAdButton = () => {
  return (
    <Dialog.Trigger className="py-3 px-4 flex items-center gap-3 bg-violet-500 hover:bg-violet-600 text-white rounded">
      <MagnifyingGlassPlus size={24} />
      Publicar anúncio
    </Dialog.Trigger>
  );
};
