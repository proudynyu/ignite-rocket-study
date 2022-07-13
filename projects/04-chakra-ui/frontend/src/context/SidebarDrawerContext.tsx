import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect } from "react";
import { isEmptyObject } from "../utils";

interface SidebarDrawerContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
}

const SidebarDrawerContext = createContext<SidebarDrawerContextProps | null>(
  null
);

export const SidebarDrawerProvider: FC = ({ children }) => {
  const disclosure = useDisclosure();
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarDrawerContext);

  if (isEmptyObject(context)) {
    throw new Error(
      "useSidebarContext must be used inside the SidebarDrawerContext"
    );
  }

  return context;
};
