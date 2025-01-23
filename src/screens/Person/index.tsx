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
import { View } from "react-native";

// Esquema de validação com Zod
const schema = z.object({
  passwordEmergecy: z.string().min(6, "A senha de emergência deve ter pelo menos 6 caracteres.").optional(),
  passwordBank: z.string().min(6, "A senha do banco deve ter pelo menos 6 caracteres.").optional(),
  passwordApp: z.string().min(6, "A senha do app deve ter pelo menos 6 caracteres.").optional(),
  passwordDevice: z.string().min(6, "A senha do dispositivo deve ter pelo menos 6 caracteres.").optional(),
  passwordDeviceEmergency: z.string().min(6, "A senha de emergência do dispositivo deve ter pelo menos 6 caracteres.").optional(),
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
    // Verifica se todas as senhas estão preenchidas
    const isEmptyField = Object.values(data).some((value) => !value);
  
    if (isEmptyField) {
      Toast.show("Todas as senhas precisam estar preenchidas!", {
        placement: "top",
        duration: 3000,
        type: "danger",
      });
      return;
    }
  
    // Verifica se o usuário tem um carro cadastrado antes de prosseguir
    if (!authData?.user?.car_id) {
      Toast.show("Para cadastrar as senhas, é obrigatório ter um carro cadastrado e estar em um grupo.", {
        placement: "top",
        duration: 3000,
        type: "danger",
      });
      return;
    }
  
    api
      .post("user/change/passwords", data)
      .then(() => {
        setAuthData({
          ...authData,
          user: { ...authData.user, ...data },
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
    <DefaultContainer showMenu showButtonGears title="Perfil">
      <Container>
        <PersonCard icon="mail" title="E-mail" subTitle={authData?.email} />
        <PersonCard icon="phone" title="Telefone" subTitle={authData?.phone} />
        <Content>
          <Title>Suas Senhas</Title>
          <SubTitle>Senha Celular</SubTitle>
          <Controller
            control={control}
            name="passwordDevice"
            render={({ field: { onChange, value } }) => (
              <View>
                <Input
                  placeholder="Cadastre sua senha do dispositivo"
                  value={value || ""}
                  onChangeText={onChange}
                />
                {errors.passwordDevice && <TextError>{errors.passwordDevice.message}</TextError>}
              </View>
            )}
          />
           <SubTitle>Senha Celular Emergência </SubTitle>
          <Controller
            control={control}
            name="passwordDeviceEmergency"
            render={({ field: { onChange, value } }) => (
              <View>
                <Input
                  placeholder="Cadastre sua senha de emergência do dispositivo"
                  value={value || ""}
                  onChangeText={onChange}
                />
                {errors.passwordDeviceEmergency && <TextError>{errors.passwordDeviceEmergency.message}</TextError>}
              </View>
            )}
          />
          <SubTitle>Senha Banco</SubTitle>
          <Controller
            control={control}
            name="passwordBank"
            render={({ field: { onChange, value } }) => (
              <View>
                <Input
                  placeholder="Cadastre sua senha de banco"
                  value={value || ""}
                  onChangeText={onChange}
                />
                {errors.passwordBank && <TextError>{errors.passwordBank.message}</TextError>}
              </View>
            )}
          />
          <SubTitle>Senha Banco Emergência</SubTitle>
          <Controller
            control={control}
            name="passwordEmergecy"
            render={({ field: { onChange, value } }) => (
              <View>
                <Input
                  placeholder="Cadastre sua senha de emergência"
                  value={value || ""}
                  onChangeText={onChange}
                />
                {errors.passwordEmergecy && <TextError>{errors.passwordEmergecy.message}</TextError>}
              </View>
            )}
          />
          
          <SubTitle>Senha PPPIX</SubTitle>
          <Controller
            control={control}
            name="passwordApp"
            render={({ field: { onChange, value } }) => (
              <View>
                <Input
                  placeholder="Cadastre sua senha do app"
                  value={value || ""}
                  onChangeText={onChange}
                />
                {errors.passwordApp && <TextError>{errors.passwordApp.message}</TextError>}
              </View>
            )}
          />
         
         
        </Content>
        <Button title="Salvar" type="PRIMARY" onPress={handleSubmit(onSubmit)} />
      </Container>
    </DefaultContainer>
  );
}
