import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface Props {
  name?: string;
  avatar_url?: string;
  showProfileData?: boolean;
}

export const Perfil = ({
  name = "Igor Becker",
  avatar_url = "https://github.com/proudynyu.png",
  showProfileData = false,
}: Props) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box>
          <Text mr="4" textAlign="right">
            Igor Becker
          </Text>
          <Text color="gray.300" fontSize="s">
            igor_nyu@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name={name} src={avatar_url} />
    </Flex>
  );
};
