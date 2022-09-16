import * as Dialog from "@radix-ui/react-dialog";

import { CreateAdButton } from "./CreateAdButton";

export const DidnFindYourDuo = () => {
  return (
    <div className="relative pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
      <div className="bg-[#2a2634] px-8 py-6 self-stretch flex justify-between items-center">
        <div>
          <strong className="text-white font-black text-2xl">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Root>
          <CreateAdButton />

          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[400px] shadow-lg shadow-black/25">
              <Dialog.Title>Publique um anúncio</Dialog.Title>

              <Dialog.Content></Dialog.Content>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};
