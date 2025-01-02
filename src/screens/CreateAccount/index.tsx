import { DefaultContainer } from "../../components/DefaultContainer";
import {
  Container,
  Content,
  ContentItems,
  ContentText,
  Header,
  Icon,
  SubTitle,
  Text,
  TextColor,
  Title,
  TextError,
} from "./styles";
import Logo from "../../assets/Logo_pppix.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "react-native-toast-notifications";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { applyPhoneMask, phoneUnMask } from "../../utils/mask";
import useSendNotifications from "../../hooks/useSendNotifications";

const formSchema = z
  .object({
    subscriberId: z.string().optional(),
    name: z
      .string()
      .min(1, "O nome é obrigatório.")
      .refine(
        (value) => value.trim().split(" ").length >= 2,
        {
          message: "O nome completo deve conter pelo menos um sobrenome.",
        }
      ),
    phone: z
      .string()
      .min(1, "O telefone é obrigatório.")
      .refine((value) => /^[0-9]{10,11}$/.test(value), {
        message: "O telefone deve ser válido e conter 10 ou 11 dígitos.",
      }),
    email: z
      .string()
      .min(1, "O email é obrigatório.")
      .email("Formato de email inválido"),
    password: z
      .string()
      .min(6, { message: "A senha deve conter pelo menos 6 caracteres." }),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });


type FormSchemaType = z.infer<typeof formSchema>;

export function CreateAccount() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [policyTerms, setPolicyTerms] = useState(false);
  const {subscriptionId} = useSendNotifications()
  console.log('subscriptionId', subscriptionId)
  const { signUp } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue, 
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      subscriberId: "", 
    },
  });
  

  useEffect(() => {
    if (subscriptionId) {
      setValue("subscriberId", subscriptionId); 
    }
  }, [subscriptionId, setValue]);

  async function handleSignup(data: FormSchemaType) {
    console.log('register', data);
    if (!policyTerms) {
      toast.show("É necessário aceitar os termos de uso!", {
        placement: "top",
        type: "danger",
        duration: 5000,
      });
      return;
    }
  
    setIsLoading(true);
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        subscribed: data.subscriberId || "", 
      });
      toast.show("Conta criada com sucesso!", {
        placement: "top",
        type: "success",
        duration: 5000,
      });
      navigation.navigate("login");
    } catch (error) {
      toast.show("Erro ao criar conta. Tente novamente.", {
        placement: "top",
        type: "danger",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <DefaultContainer>
      <Container>
        <Header>
          <Title>Cadastre-se!</Title>
          <Logo width={60} height={70} />
        </Header>
        <Content>
          <SubTitle>Cadastre sua conta e comece a sua segurança.</SubTitle>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                name="user"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                showIcon
                placeholder="Nome*"
              />
            )}
          />
          {errors.name && <TextError>{errors.name.message}</TextError>}

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                name="phone"
                value={applyPhoneMask(value)}
                onChangeText={(text) => onChange(phoneUnMask(text))}
                onBlur={onBlur}
                showIcon
                placeholder="Telefone*"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phone && <TextError>{errors.phone.message}</TextError>}

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
                placeholder="Email*"
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
                placeholder="Senha*"
                passwordType
              />
            )}
          />
          {errors.password && <TextError>{errors.password.message}</TextError>}

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                name="lock"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                showIcon
                placeholder="Confirme a sua senha*"
                passwordType
              />
            )}
          />
          {errors.confirmPassword && (
            <TextError>{errors.confirmPassword.message}</TextError>
          )}

          <ContentText onPress={() => setPolicyTerms(!policyTerms)}>
            <Icon name={policyTerms ? "check-square-o" : "square-o"} />
            <Text>Eu concordo com os termos de política de privacidade.</Text>
          </ContentText>

          <ContentItems>
            <Button
              onPress={handleSubmit(handleSignup)}
              title="Cadastrar"
              isLoading={isLoading}
              disabled={isLoading}
            />
            <ContentText onPress={() => navigation.navigate("login")}>
              <Text>Já tem uma conta?</Text>
              <TextColor> Entrar</TextColor>
            </ContentText>
          </ContentItems>
        </Content>
      </Container>
    </DefaultContainer>
  );
}