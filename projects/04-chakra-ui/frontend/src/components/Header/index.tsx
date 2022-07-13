import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarContext } from "../../context/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationNav";
import { Perfil } from "./Perfil";
import { Search } from "./Search";

export const Header = () => {
  const { onOpen } = useSidebarContext();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      w="100%"
      as="header"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      {!isWideVersion && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open Navigation"
          mr="2"
        />
      )}
      <Logo />
      {isWideVersion && <Search />}
      <Flex align="center" ml="auto">
        <NotificationNav />
        <Perfil showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
};
