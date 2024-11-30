import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { Container, Content, TextError } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "../../hooks/useAxios";
import { Toast } from "react-native-toast-notifications";

const formSchema = z.object({
  brand: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  color: z.string().min(1, "Cor é obrigatória"),
  licensePlate: z.string().min(1, "Placa é obrigatória"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function CreateCar() {
  const navigation = useNavigation();
  const { api } = useAxios();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      model: "",
      color: "",
      licensePlate: "",
    },
  });

  async function handleCreateCar(data: FormSchemaType) {
    try {
      await api.post("car", data);
      Toast.show("Veículo cadastrado com sucesso!", {
        type: "success",
        placement: "top",
        duration: 3000,
      });
      navigation.goBack();
    } catch (error) {
      Toast.show("Erro ao cadastrar o veículo. Tente novamente.", {
        type: "danger",
        placement: "top",
        duration: 5000,
      });
    }
  }

  return (
    <DefaultContainer title="Novo Veículo" showMenu showButtonBack>
      <Container>
        <Content>
          <Controller
            control={control}
            name="brand"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Marca"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.brand && <TextError>{errors.brand.message}</TextError>}
              </>
            )}
          />
          <Controller
            control={control}
            name="model"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Modelo"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.model && <TextError>{errors.model.message}</TextError>}
              </>
            )}
          />
          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Cor"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.color && <TextError>{errors.color.message}</TextError>}
              </>
            )}
          />
          <Controller
            control={control}
            name="licensePlate"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Placa"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.licensePlate && (
                  <TextError>{errors.licensePlate.message}</TextError>
                )}
              </>
            )}
          />
        </Content>
        <Button title="Cadastrar Veículo" onPress={handleSubmit(handleCreateCar)} />
      </Container>
    </DefaultContainer>
  );
}
