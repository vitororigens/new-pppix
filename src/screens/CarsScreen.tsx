import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { Radio } from 'native-base';
import { useToast } from 'native-base';
import { AxiosResponse } from 'axios';
import AccordionContact from '../components/AccordionContact';
import { useAxios } from '../hooks/useAxios';
import { useAuth } from '../hooks/useAuth';

type carType = {
  id: number;
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
};

export function CarsScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const { authData, setAuthData } = useAuth();
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const { api, load } = useAxios();

  function updateCars() {
    api.get('car')
      .then(async (response: AxiosResponse) => {
        setCars(response.data.cars);
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
    api.delete(`car/${car_id}`)
      .then(() => {
        toast.show({
          title: "Veiculo deletado com sucesso!!",
          placement: "top",
          duration: 3000,
          bgColor: "green.500",
        });
        updateCars();
      })
      .catch(() => {
        toast.show({
          title: "Selecione outro carro como principal antes de apagar!!",
          placement: "top",
          duration: 3000,
          bgColor: "red.500",
        });
      });
  }

  

  async function handleSaveCar() {
    const updatedAuthUserData = { ...authData?.user, car_id: selectedCar };
    const updatedAuthData = { ...authData, user: updatedAuthUserData, car_id: selectedCar };
  
    api.post('user/change/car', { car_id: selectedCar })
      .then(() => {
        setAuthData(updatedAuthData);
        toast.show({
          title: "Veiculo selecionado com sucesso!!",
          placement: "top",
          duration: 3000,
          bgColor: "green.500",
        });
        navigation.goBack();
      })
      .catch(() => {
        toast.show({
          title: "Ocorreu um erro na troca de veiculo!!",
          placement: "top",
          duration: 3000,
          bgColor: "red.500",
        });
      });
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Selecionar carro</Text>
        </View>

        <View style={styles.formStyle}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextInput placeholder="Placa do carro" style={styles.formSenha} value={search} onChangeText={(text) => setSearch(text)} />
          </View>
          <ScrollView
            style={{
              maxHeight: "65%",
              width: "100%",
              marginTop: 20,
            }}
          >
            <Radio.Group name="myRadioGroup" defaultValue={selectedCar}  accessibilityLabel="favorite number" value={selectedCar} onChange={nextValue => {
              setSelectedCar(nextValue);
            }}>
              {cars.map((car: carType) => {
                if (search === '' || (car.licensePlate.search(search) !== -1)) {
                  return (<AccordionContact deleteHandle={() => handleDeleteCar(car.id)} name={`${(car.brand.length > 10) ? car.brand.substr(0, 10) : car.brand} - ${(car.licensePlate.length > 5) ? car.licensePlate.substr(0, 5) : car.licensePlate} `} icon={""} id={`${car.id}`} key={car.id} />)
                }
              })}
            </Radio.Group>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSaveCar}
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
    height: "25rem",
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
