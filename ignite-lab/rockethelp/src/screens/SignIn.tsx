import { useState } from "react";
import { VStack, Heading, useTheme, Icon } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { colors } = useTheme();

  function handleSignIn() {
    console.log({
      email,
      password,
    });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading
        color="gray.100"
        fontSize="xl"
        mt={20}
        mb={6}
        fontFamily="heading"
      >
        Sign In
      </Heading>
      <Input
        placeholder="E-mail"
        InputLeftElement={
          <Icon ml={4} as={<Envelope color={colors.gray[300]} />} />
        }
        mb={4}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} />} />}
        mb={8}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleSignIn} w="full" />
    </VStack>
  );
};
