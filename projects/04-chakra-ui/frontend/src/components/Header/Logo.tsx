import { Text } from "@chakra-ui/react";
export const Logo = () => {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      Dashgo
      <Text color="pink.500" as="span" ml="1">
        .
      </Text>
    </Text>
  );
};
