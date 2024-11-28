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
import { useState } from "react";


const formSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Formato inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type FormSchemaType = z.infer<typeof formSchema>;


export function Login() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset, formState: { errors} } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <DefaultContainer>
      <Container>
        <Header>
          <Title>
            Bem vindo!
          </Title>
          <Logo width={60} height={70} />
        </Header>
        <Content>
          <SubTitle>
            Faça seu login na sua conta e comece a sua segurança.
          </SubTitle>
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
          <TextColor>
            Esqueceu a senha?
          </TextColor>
          <ContentItems>
          <Button
              onPress={handleSubmit(handleRegister)}
              title="Entrar"
              isLoading={isLoading}
              disabled={isLoading}
            />
            <ContentText onPress={() => navigation.navigate("createAccount")}>
              <Text>
                Não tem uma conta?
              </Text>
              <TextColor> Cadastre - se</TextColor>
            </ContentText>
          </ContentItems>
          <CardInfo />
        </Content>
      </Container>
    </DefaultContainer>
  );
}


