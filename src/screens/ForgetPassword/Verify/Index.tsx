import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Heading,
  KeyboardAvoidingView,
  Text,
  useToast,
  VStack,
} from "native-base";
import React from "react";
import { Platform } from "react-native";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";
import api from "../../../config/Axios";

interface RouteParams {
  email: string;
}

function VerifyPassword() {
  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState("");

  const toast = useToast();
  const { navigate } = useNavigation();
  const route = useRoute();

  const { email } = route.params as RouteParams;

  const handleSendCode = async () => {
    setLoading(true);

    if (!code.trim()) {
      setLoading(false);
      return toast.show({
        title: "Código é obrigatório",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      const response = await api.post("/auth/recover/check", {
        email,
        code: code.trim(),
      });

      if (response.status === 200) {
        navigate("PassLoading", { email, code: code.trim() });
        setLoading(false);

        return;
      }
    } catch (err) {
      toast.show({
        title: "Código inválido",
        placement: "top",
        bgColor: "red.500",
      });

      setLoading(false);
    }
  };

  return (
    <VStack safeArea flex={1}>
      <Header title="Verificação de código" showBackButton />

      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VStack flex={1} px={8}>
          <Heading
            mt={4}
            fontFamily={"heading"}
            color="gray.800"
            fontSize={"xl"}
            mb={2}
            textAlign="center"
          >
            Verifique o seu E-mail
          </Heading>
          <Text textAlign={"center"} mb={8} fontSize={"md"} color="gray.500">
            Por favor digite o código enviado para o seu e-mail
          </Text>

          <Input
            placeholder="Código"
            onChangeText={(value) => setCode(value)}
          />
        </VStack>

        <Box px={8} mb={2}>
          <Button
            title="Enviar código"
            onPress={handleSendCode}
            isLoading={loading}
          />
        </Box>
      </KeyboardAvoidingView>
    </VStack>
  );
}

export default VerifyPassword;
