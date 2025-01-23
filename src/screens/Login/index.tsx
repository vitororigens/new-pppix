import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, Content, ContentItems, ContentText, Header, SubTitle, Text, TextColor, TextError, Title } from "./styles";
import Logo from "../../assets/Logo_pppix.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { CardInfo } from "../../components/CardInfo";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useSendNotifications from "../../hooks/useSendNotifications";

const formSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Formato inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
  subscriptionsids: z.string().min(1, "subscriptionsids é obrigatório"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function Login() {
  const navigation = useNavigation();
  const { signin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {subscriptionId} = useSendNotifications()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

    useEffect(() => {
      if (subscriptionId) {
        setValue("subscriptionsids", subscriptionId); 
      }
    }, [subscriptionId, setValue]);

    async function handleLogin(data: FormSchemaType) {
      setIsLoading(true);
      try {
          const transformedData = {
              ...data,
              email: data.email.toLowerCase(),
          };
          await signin(transformedData); 
      } catch (error) {
          console.error("Erro ao fazer login:", error);
      } finally {
          setIsLoading(false);
      }
  }

  return (
    <DefaultContainer>
      <Container>
        <Header>
          <Title>Bem-vindo!</Title>
          <Logo width={60} height={70} />
        </Header>

        <Content>
          <SubTitle>Faça seu login na sua conta e comece a sua segurança.</SubTitle>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                name="envelope"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                showIcon
                placeholder="Email"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <TextError>{errors.email.message}</TextError>}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                name="lock"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                showIcon
                placeholder="Senha"
                passwordType
              />
            )}
          />
          {errors.password && <TextError>{errors.password.message}</TextError>}

          <TextColor onPress={() => navigation.navigate("forgetpassword")}>
            Esqueceu a senha?
          </TextColor>

          <ContentItems>
            <Button
              onPress={handleSubmit(handleLogin)}
              title="Entrar"
              isLoading={isLoading}
              disabled={isLoading}
            />
            <ContentText onPress={() => navigation.navigate("createAccount")}>
              <Text>Não tem uma conta?</Text>
              <TextColor> Cadastre-se</TextColor>
            </ContentText>
          </ContentItems>

          <CardInfo />
        </Content>
      </Container>
    </DefaultContainer>
  );
}
