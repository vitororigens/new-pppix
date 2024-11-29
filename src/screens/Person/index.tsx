import { useState } from "react";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { PersonCard } from "../../components/PersonCard";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { Container, Content, SubTitle, TextError, Title } from "./styles";
import { Toast } from "react-native-toast-notifications";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Esquema de validação com Zod
const schema = z.object({
  passwordEmergecy: z.string().min(6, "A senha de emergência deve ter pelo menos 6 caracteres."),
  passwordBank: z.string().min(6, "A senha do banco deve ter pelo menos 6 caracteres."),
  passwordApp: z.string().min(6, "A senha do app deve ter pelo menos 6 caracteres."),
  passwordDevice: z.string().min(6, "A senha do dispositivo deve ter pelo menos 6 caracteres."),
  passwordDeviceEmergency: z.string().min(6, "A senha de emergência do dispositivo deve ter pelo menos 6 caracteres."),
});

type FormData = z.infer<typeof schema>;

export function Person() {
  const { authData, setAuthData } = useAuth();
  const { api } = useAxios();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      passwordEmergecy: authData?.passwordEmergecy || "",
      passwordBank: authData?.passwordBank || "",
      passwordApp: authData?.passwordApp || "",
      passwordDevice: authData?.passwordDevice || "",
      passwordDeviceEmergency: authData?.passwordDeviceEmergency || "",
    },
  });

  const onSubmit = (data: FormData) => {
    api
      .post("user/change/passwords", data)
      .then(() => {
        setAuthData({
          ...authData,
          user: { ...authData, ...data },
        });
        Toast.show("Senhas alteradas com sucesso!", {
          placement: "top",
          duration: 3000,
          type: "success",
        });
      })
      .catch(() => {
        Toast.show("Erro ao salvar as senhas. Tente novamente.", {
          placement: "top",
          duration: 3000,
          type: "danger",
        });
      });
  };

  return (
    <DefaultContainer showMenu showButtonGears title="Perfil" showMenu>
      <Container>
        <PersonCard icon="mail" title="E-mail" subTitle={authData?.email} />
        <PersonCard icon="phone" title="Telefone" subTitle={authData?.phone} />
        <Content>
          <Title>Suas Senhas</Title>
          <SubTitle>Senha emergência</SubTitle>
          <Controller
            control={control}
            name="passwordEmergecy"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Cadastre sua senha de emergência"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.passwordEmergecy && <TextError>{errors.passwordEmergecy.message}</TextError>}
              </>
            )}
          />
          <SubTitle>Senha banco</SubTitle>
          <Controller
            control={control}
            name="passwordBank"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Cadastre sua senha de banco"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.passwordBank && <TextError>{errors.passwordBank.message}</TextError>}
              </>
            )}
          />
          <SubTitle>Senha APP</SubTitle>
          <Controller
            control={control}
            name="passwordApp"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Cadastre sua senha do app"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.passwordApp && <TextError>{errors.passwordApp.message}</TextError>}
              </>
            )}
          />
          <SubTitle>Senha Dispositivo</SubTitle>
          <Controller
            control={control}
            name="passwordDevice"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Cadastre sua senha do dispositivo"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.passwordDevice && <TextError>{errors.passwordDevice.message}</TextError>}
              </>
            )}
          />
          <SubTitle>Senha Emergência Dispositivo</SubTitle>
          <Controller
            control={control}
            name="passwordDeviceEmergency"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Cadastre sua senha de emergência do dispositivo"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.passwordDeviceEmergency && <TextError>{errors.passwordDeviceEmergency.message}</TextError>}
              </>
            )}
          />
        </Content>
        <Button title="Salvar" type="PRIMARY" onPress={handleSubmit(onSubmit)} />
      </Container>
    </DefaultContainer>
  );
}
