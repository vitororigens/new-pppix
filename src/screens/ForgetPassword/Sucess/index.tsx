import { Container, Content, ContentItems, SubTitle, TextError } from "./styles";
import { DefaultContainer } from "../../../components/DefaultContainer";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import api from "../../../config/Axios"; // Certifique-se de importar corretamente sua instância do Axios

const formSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    confirmPassword: z.string().min(6, "A confirmação deve ter no mínimo 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas devem ser iguais.",
  });

type FormSchemaType = z.infer<typeof formSchema>;

export function Sucess() {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const route = useRoute();
  const toast = useToast();

  const { email, code } = route.params as { email: string; code: string };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (data: FormSchemaType) => {
    setLoading(true);

    try {
      const response = await api.post("auth/recover/change", {
        email,
        password: data.password,
        code: code.trim(),
      });

      if (response.status === 200) {
        toast.show("Senha alterada com sucesso!", {
          type: "success",
          placement: "top",
        });
        navigate("login");
      }
    } catch (err) {
      toast.show("Erro ao alterar a senha. Tente novamente.", {
        type: "danger",
        placement: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultContainer showMenu showButtonBack title="Alterar senha">
      <Container>
        <Content>
          <SubTitle>Crie sua nova senha para acessar sua conta.</SubTitle>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                showIcon
                name="lock"
                placeholder="Senha*"
                passwordType
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.password && <TextError>{errors.password.message}</TextError>}

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                showIcon
                name="lock"
                placeholder="Confirme sua senha*"
                passwordType
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.confirmPassword && (
            <TextError>{errors.confirmPassword.message}</TextError>
          )}

          <ContentItems>
            <Button
              title="Redefinir senha"
              onPress={handleSubmit(handleResetPassword)}
              isLoading={loading}
            />
          </ContentItems>
        </Content>
      </Container>
    </DefaultContainer>
  );
}
