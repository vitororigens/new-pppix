import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EStyleSheet from "react-native-extended-stylesheet";
import Ion from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Notification from "../components/Notification";
import IconFont from "react-native-vector-icons/FontAwesome5";
import NofityCars from "../components/NotifyCars";
import { useState, useEffect, ReactNode, useRef } from 'react'
import { useAxios } from '../hooks/useAxios'
import { useAuth } from '../hooks/useAuth'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { FlatList, Select, useToast } from 'native-base';


interface AlertData {
  id: string;
  email: string;
  status: number;
  car: {
    brand: string;
    licensePlate: string;
    color: string;
    model: string;
  };
  lat: string;
  log: string;
  finished_lat: string;
  finished_log: string;
}


export function Notifications() {
  const navigation = useNavigation();
  const { api } = useAxios();
  const { authData } = useAuth();
  const toast = useToast();
  const mapViewRef = useRef<MapView>(null);

  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [select, setSelect] = useState('alert');

  function handleFinishSos(alert_id: string) {
    api.post('alert/finish', { alert_id }).then(() => {
      toast.show({
        title: 'Alerta encerrado com sucesso!!',
        placement: 'top',
        duration: 3000,
        bgColor: 'green.500',
      });
      updateAlerts();
    });
  }

  

  function handleFinishAll() {
    api.post('alert/finish/all').then(() => {
      toast.show({
        title: 'Alertas encerrados com sucesso!!',
        placement: 'top',
        duration: 3000,
        bgColor: 'green.500',
      });
      updateAlerts();
    });
  }

  function updateAlerts() {
    api.get('alert').then((response) => {
      setAlerts(response.data.alerts);
    });
  }

  useEffect(() => {
    updateAlerts();
    const intervalId = setInterval(() => {
      updateAlerts();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContent}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Ion name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 17, color: 'white' }}>Notificações</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleFinishAll()}>
            <IconFont name={'trash-alt'} size={25} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 30, }}>
        <View style={styles.select}>
          <Select
            backgroundColor={'white'}
            selectedValue={select}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            mt={1}
            onValueChange={(itemValue) => setSelect(itemValue)}
          >
            <Select.Item label="Meus Alertas" value="myAlert" />
            <Select.Item label="Alertas recebidos" value="alert" />
          </Select>
        </View>

        <FlatList
         keyExtractor={(item) => item.id.toString()}
          data={alerts}
          renderItem={({ item }) => (
            <>
            
            <View style={styles.notifyBox}>
                   {select == 'myAlert'  && item.email == authData?.email &&(
                      <View style={styles.notifyContent}>
                      <Notification icon="" name={item.email.substring(0, 5) + '....'} />
                      <NofityCars icon="" name={item.car.brand} subTitle={item.car.licensePlate} cor={item.car.color} marca={item.car.model}/>
                      <MapView.Animated
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}
                        ref={mapViewRef}
                        initialRegion={{
                          latitude: Number(item.finished_lat),
                          longitude: Number(item.finished_log),
                          latitudeDelta: 0.006,
                          longitudeDelta: 0.006,
                        }}
                      >
                        <Marker.Animated
      
                          coordinate={{ latitude: Number(item.finished_lat), longitude: Number(item.finished_log) }}
                        />
                      </MapView.Animated>
                      <View style={{
                        width: '100%',
                        alignItems: 'center',
                      }}>
                        <TouchableOpacity style={styles.notifyButton}>
                          <Text style={{
                            textAlign: 'center'
                          }}>
                            Encerrar
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                   )}      
            </View>
                 <View style={styles.notifyBox}>
                 {select == 'alert'  && item.email != authData?.email &&(
                      <View style={styles.notifyContent}>
                      <Notification icon="" name={item.email.substring(0, 5) + '....'} />
                      <NofityCars icon="" name={item.car.brand} subTitle={item.car.licensePlate} cor={item.car.color} marca={item.car.model}/>
                      <MapView.Animated
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}
                        ref={mapViewRef}
                        initialRegion={{
                          latitude: Number(item.finished_lat),
                          longitude: Number(item.finished_log),
                          latitudeDelta: 0.006,
                          longitudeDelta: 0.006,
                        }}
                      >
                        <Marker.Animated
      
                          coordinate={{ latitude: Number(item.finished_lat), longitude: Number(item.finished_log) }}
                        />
                      </MapView.Animated>
                      <View style={{
                        width: '100%',
                        alignItems: 'center',
                      }}>
                        <TouchableOpacity style={styles.notifyButton} onPress={() => handleFinishSos(item.id)} >
                          <Text style={{
                            textAlign: 'center'
                          }}>
                            Encerrar
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                   )}  
                  </View>
            </>
          )}

        />
      </View>



    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5372ef",
  },
  iconContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "2rem",
    marginTop: "1.5rem",
    marginRight: "1rem",
  },
  notifyBox: {
    alignItems: "center",
    
    
  },
  select: {
    width: "19.7rem",
    marginBottom: 10,
  },
  notifyContent: {
    height: "20rem",
    width: "20.7rem",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: "1.4rem",
    fontSize: "1rem",
    marginBottom: 10,
  },
  notifyButton: {
    backgroundColor: "#aa271b",
    width: "8rem",
    height: "2rem",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",

  },


});
