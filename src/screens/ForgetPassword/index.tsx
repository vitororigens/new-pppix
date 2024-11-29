import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import {
  Container,
  Content,
  ContentItems,
  SubTitle,
  Text,
  TextError,
} from "./styles";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import api from "../../config/Axios";

const formSchema = z.object({
  email: z.string().min(1, "O email é obrigatório").email("Formato inválido"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function ForgetPassword() {
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleResetPassword(data: FormSchemaType) {
    setLoading(true);

    try {
      const response = await api.post("/auth/recover/generate", {
        email: data.email.trim(),
      });

      if (response.status === 200) {
        toast.show(response.data.message, {
          placement: "top",
          type: "success",
          duration: 5000,
        });

        navigation.navigate("verify", { email: data.email.trim() });
      }
    } catch (err) {
      toast.show("Email não encontrado. Verifique e tente novamente.", {
        placement: "top",
        type: "danger",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <DefaultContainer showMenu showButtonBack title="Alterar senha">
      <Container>
        <Content>
          <SubTitle>
            Esqueceu sua senha? Sem problemas! Vamos te ajudar a redefini-la.
          </SubTitle>
          <Text>
            Por favor, insira o e-mail cadastrado e enviaremos um link com o código para
            criar uma nova senha.
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                showIcon
                name="envelope"
                placeholder="E-mail"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.email && <TextError>{errors.email.message}</TextError>}

          <ContentItems>
            <Button
              title="Enviar email"
              isLoading={loading}
              onPress={handleSubmit(handleResetPassword)}
              disabled={loading}
            />
          </ContentItems>
        </Content>
      </Container>
    </DefaultContainer>
  );
}
