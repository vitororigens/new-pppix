import { Container, Content, ContentItems, Input, SubTitle, Text } from "./styles";
import { DefaultContainer } from "../../../components/DefaultContainer";
import { Button } from "../../../components/Button";
import api from "../../../config/Axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "react-native-toast-notifications";
import { useRef } from "react";
import { TextInput } from "react-native";

const formSchema = z.object({
  code: z
    .string()
    .min(4, "Preencha todos os dígitos.")
    .regex(/^\d{4}$/, "Código inválido. Use apenas números."),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function Verify() {
  const toast = useToast();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { email } = route.params as { email?: string };

  const inputRefs = useRef<(TextInput | null)[]>([]); 

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  const watchCode = watch("code");

  const handleSendCode = async (data: FormSchemaType) => {
    const fullCode = data.code;

    try {
      const response = await api.post("/auth/recover/check", {
        email,
        code: fullCode,
      });

      if (response.status === 200) {
        navigate("passloading", { email, code: fullCode });
        toast.show("Código verificado com sucesso!", { type: "success" });
      }
    } catch (err) {
      toast.show("Código inválido. Tente novamente.", { type: "danger" });
    }
  };

  const handleDigitChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const currentCode = watchCode.split("");
      currentCode[index] = value || "";
      const updatedCode = currentCode.join("");

      setValue("code", updatedCode);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.key === "Backspace") {
      const currentCode = watchCode.split("");
      currentCode[index] = "";
      setValue("code", currentCode.join("")); 

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <DefaultContainer showMenu showButtonBack title="Alterar senha">
      <Container>
        <SubTitle>
          Esqueceu sua senha? Sem problemas! Vamos te ajudar a redefini-la.
        </SubTitle>
        <Text>Por favor, insira o código enviado para seu e-mail.</Text>
        <Content style={{ flexDirection: "row", justifyContent: "center" }}>
          <Controller
            control={control}
            name="code"
            render={() => (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    value={watchCode[index] || ""}
                    onChangeText={(value) => handleDigitChange(value, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    variant={errors.code ? "PRIMARY" : "SECONDARY"}
                  />
                ))}
              </>
            )}
          />
        </Content>
        {errors.code && (
          <Text style={{ color: "red", textAlign: "center" }}>
            {errors.code.message}
          </Text>
        )}
        <ContentItems>
          <Button
            title="Verificar"
            onPress={handleSubmit(handleSendCode)}
            isLoading={false}
          />
        </ContentItems>
      </Container>
    </DefaultContainer>
  );
}
