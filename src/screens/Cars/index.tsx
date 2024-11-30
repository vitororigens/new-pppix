import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemCar } from "../../components/ItemCar";
import { Container, Content } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { Toast } from "react-native-toast-notifications";
import { Car } from "../../contexts/AuthContext";

export function Cars() {
  const navigation = useNavigation();
  const { authData, setAuthData } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const { api } = useAxios();

  function updateCars() {
    api
      .get("car")
      .then((response) => {
        setCars(response.data.cars || []);
        if (authData?.car_id) {
          setSelectedCar(String(authData.car_id));
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar carros:", error);
      });
  }

  useEffect(() => {
    updateCars();
  }, []);

  function handleDeleteCar(car_id: string) {
    api
      .delete(`car/${car_id}`)
      .then(() => {
        Toast.show("Veículo deletado com sucesso!", {
          type: "success",
          placement: "top",
          duration: 3000,
        });
        updateCars();
      })
      .catch(() => {
        Toast.show("Selecione outro carro como principal antes de apagar!", {
          type: "danger",
          placement: "top",
          duration: 3000,
        });
      });
  }

  async function handleSaveCar() {
    const updatedAuthUserData = { ...authData?.user, car_id: selectedCar };
    const updatedAuthData = { ...authData, user: updatedAuthUserData, car_id: selectedCar };

    api
      .post("user/change/car", { car_id: selectedCar })
      .then(() => {
        setAuthData(updatedAuthData);
        Toast.show("Veículo selecionado com sucesso!", {
          type: "success",
          placement: "top",
          duration: 3000,
        });
        navigation.goBack();
      })
      .catch(() => {
        Toast.show("Ocorreu um erro na troca de veículo!", {
          type: "danger",
          placement: "top",
          duration: 3000,
        });
      });
  }

  const filteredCars = cars.filter((car) =>
    `${car.brand} ${car.model} ${car.color} ${car.licensePlate}`
      .toLowerCase()
      .includes(searchTerms.toLowerCase())
  );

  return (
    <DefaultContainer title="Selecionar Carro" showMenu showButtonBack>
      <Container>
        <Input
          placeholder="Pesquisar"
          value={searchTerms}
          onChangeText={setSearchTerms}
        />
        <Content>
          {filteredCars.map((car) => (
            <ItemCar
              key={car.id}
              id={car.id}
              brand={car.brand}
              model={car.model}
              color={car.color}
              licensePlate={car.licensePlate}
              onDelete={() => handleDeleteCar(car.id)}
              onToggle={() => setSelectedCar(car.id)}
              isChecked={selectedCar === car.id}
            />
          ))}
        </Content>
        <Button title="Salvar" onPress={handleSaveCar} />
      </Container>
    </DefaultContainer>
  );
}
