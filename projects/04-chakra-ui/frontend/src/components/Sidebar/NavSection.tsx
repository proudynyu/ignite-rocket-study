import { Box, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  title: string;
}

export const NavSection: FC<Props> = ({ title, children }) => {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="s">
        {title}
      </Text>
      <Stack spacing={4} mt={8} align="stretch">
        {children}
      </Stack>
    </Box>
  );
};
