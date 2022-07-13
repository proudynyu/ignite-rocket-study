import { Icon, Link as ChakraLink, Text, LinkProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ActiveLink } from "../ActiveLink";

interface Props extends LinkProps {
  name: string;
  icon: IconType;
  href: string;
}

export const NavLinks = ({ name, href, icon, ...rest }: Props) => {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {name}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
};
