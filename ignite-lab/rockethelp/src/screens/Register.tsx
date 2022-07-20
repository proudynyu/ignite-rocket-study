import { VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Register = () => {
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Registro" />
      <Input placeholder="Número do patrimônio" mt={4} />
      <Input
        placeholder="Descrição do problema"
        mt={5}
        multiline
        flex={1}
        textAlignVertical="top"
      />
      <Button title="Cadastrar" mt={5} />
    </VStack>
  );
};
