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
  code: string;
}

function SuccessPassword() {
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  const route = useRoute();

  const { email, code } = route.params as RouteParams;

  const handleResetPassword = async () => {
    setLoading(true);

    if (
      !password.trim() ||
      !confirmPassword.trim() ||
      password !== confirmPassword
    ) {
      return toast.show({
        title: "Senha é obrigatório e devem ser iguais",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      const response = await api.post("auth/recover/change", {
        email,
        password,
        code: code.trim(),
      });

      if (response.status === 200) {
        toast.show({
          title: "Senha alterada com sucesso",
          placement: "top",
          bgColor: "green.500",
        });

        navigate("signIn");
        setLoading(false);

        return;
      }
    } catch (err) {
      toast.show({
        title: "Erro ao alterar a senha",
        placement: "top",
        bgColor: "red.500",
      });

      setLoading(false);
    }
  };

  return (
    <VStack safeArea flex={1}>
      <Header title="Nova senha" />

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
            Digite uma nova senha
          </Heading>
          <Text textAlign={"center"} mb={8} fontSize={"md"} color="gray.500">
            Por favor digite uma nova senha para sua conta
          </Text>

          <Input
            placeholder="Senha"
            mb={2}
            type={'password'}
            onChangeText={(value) => setPassword(value)}
          />
          <Input
            type={'password'}
            placeholder="Confirmação de senha"
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </VStack>

        <Box px={8} mb={2}>
          <Button
            title="Solicitar redefinição"
            onPress={handleResetPassword}
            isLoading={loading}
          />
        </Box>
      </KeyboardAvoidingView>
    </VStack>
  );
}

export default SuccessPassword;
