import { useNavigation } from "@react-navigation/native";
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
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import api from "../../config/Axios";

function ForgotPassword() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  const handleResetPassword = async () => {
    setLoading(true);

    if (!email.trim()) {
      setLoading(false);
      return toast.show({
        title: "Email é obrigatório",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      const response = await api.post("/auth/recover/generate", {
        email: email.trim(),
      });

      if (response.status === 200) {
        toast.show({
          title: response.data.message,
          placement: "top",
          bgColor: "green.500",
        });

        navigate("VerifyPassword", { email: email.trim() });
        setLoading(false);
        return;
      }
    } catch (err) {
      toast.show({
        title: "Email não encontrado",
        placement: "top",
        bgColor: "red.500",
      });

      setLoading(false);
    }
  };

  return (
    <VStack safeArea flex={1}>
      <Header title="Alterar senha" showBackButton />

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
            Redefinir senha a partir do {"\n"} seu email
          </Heading>
          <Text textAlign={"center"} mb={8} fontSize={"md"} color="gray.500">
            Verifique se seu email está correto!
          </Text>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
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

export default ForgotPassword;
