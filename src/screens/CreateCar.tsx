import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EStyleSheet from "react-native-extended-stylesheet";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { useToast } from "native-base";
import { useAxios } from '../hooks/useAxios'

export function CarsScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const { api } = useAxios()

  const [brand, setName] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [licensePlate, setPlate] = useState("");
  

  useEffect(() => {
    
  }, [])

  async function handleCreateCar() {
    if (brand == '' || model == '' || color == '' || licensePlate == '' ) {
      toast.show({
        title: "Por favor preencha todos os campos!",
        placement: "top",
        bgColor: "red.500",
        duration: 5000,
      });
      return;
    } 
    api.post('car', { brand, model, color, licensePlate })
    .then((response:AxiosResponse) => {
      navigation.goBack()
      toast.show({
        title: "Veiculo cadastrado com sucesso!!",
        placement: "top",
        duration: 3000,
        bgColor: "green.500",
      });
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Novo Veículo</Text>
        </View>

        <View style={styles.formStyle}>
          <TextInput
            placeholder="Marca"
            style={styles.formEmail}
            value={brand}
            onChangeText={(text) => setName(text)}
          />

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextInput
              placeholder="Modelo"
              style={styles.formSenha}
              value={model}
              onChangeText={(text) => setModel(text)}
            />
            <TextInput
              placeholder="Cor"
              style={styles.formSenha}
              value={color}
              onChangeText={(text) => setColor(text)}
            />

            <TextInput
              placeholder="Placa"
              style={styles.formSenha}
              value={licensePlate}
              onChangeText={(text) => setPlate(text)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleCreateCar}
      >
        <View style={styles.containerButton}>
          <Text style={styles.textButton}>Confirmar</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5372ef",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    marginTop: "5rem",
    height: "24rem",
    width: "19.7rem",
    borderRadius: "2rem",
    backgroundColor: "#fff",
    padding: "1rem",
  },
  formStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1.5rem",
    width: "17rem",
  },
  formText: {
    fontSize: "1rem",
    color: "#C4BABA",
  },
  formSenha: {
    marginTop: "1rem",
    borderWidth: 1,
    borderColor: "#c0d3ff",
    borderRadius: 30,
    paddingHorizontal: "1.5rem",
    width: "100%",
    height: 50,
  },
  formEmail: {
    marginTop: "1rem",
    borderWidth: 1,
    borderColor: "#c0d3ff",
    borderRadius: 30,
    paddingHorizontal: "1.5rem",
    width: "100%",
    height: 50,
  },
  containerButton: {
    width: "19.7rem",
    borderRadius: 30,
    marginTop: "1.5rem",
    backgroundColor: "#7aa2ff",
    height: "4rem",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CarsScreen;
