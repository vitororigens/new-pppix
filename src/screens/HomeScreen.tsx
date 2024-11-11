import { View, Alert, Center, VStack, HStack, Box } from "native-base";
import { Text, TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EStyleSheet from "react-native-extended-stylesheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconAnt from "react-native-vector-icons/AntDesign";
import Ion from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SignOut } from "phosphor-react-native";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from '../hooks/useAxios';
import React, { useState, useEffect } from 'react' 
import { AxiosResponse } from "axios";



export function HomeScreen() {
  const navigation = useNavigation();
  const { api, load } = useAxios()
  const { signOut, authData} = useAuth();
  const [ data, setData ] = useState({
    groupNumbers: 0,
    groupContacts: 0,
    carNumbers: 0
  })
  const [currentIcon, setCurrentIcon] = React.useState("");

  
  function handleUpdateData() {
    api.get('data/home')
      .then((response:AxiosResponse) => {
        setData(response.data.data)
      })
  }
  
  const handleSignOut = async () => {
    signOut()
    // try {
    //   await changeIcon('bb') 
    //   .then(() => {
    //     setCurrentIcon('bb');
    //     Toast.show({
    //       text1: "Icon changed",
    //       visibilityTime: 2000,
    //     });
    //   })
    // } catch (error) {
    //   console.error('Error signing out:', error);
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error signing out',
    //     visibilityTime: 2000,
    //   });
    // }
  };
  
  useEffect(() => {
    if (load) {
      setTimeout(handleUpdateData, 200)
    }
  }, [load])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notifications}>
        <TouchableOpacity
          onPress={handleSignOut}
        >
          <SignOut color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ion name="notifications-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("GroupScreen")}
        >
          <View style={styles.contentBox}>
            <IconAnt
              name="user"
              size={40}
              color="#fff"
              style={{ marginTop: 15 }}
            />
            <Text style={styles.boxText}>Grupos</Text>

            <View style={styles.boxBottomText}>
              <Text style={styles.bottomText}>{ data.groupNumbers } Grupos</Text>
              <Text style={styles.bottomText}>{ data.groupContacts }  Contatos</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Security")}
        >
          <View style={styles.contentBoxCenter}>
            <IconAnt
              name="appstore-o"
              size={40}
              color="#fff"
              style={{ marginTop: 15 }}
            />
            <Text style={styles.boxText}>Aplicativos</Text>

            <View style={styles.boxBottomText}>
              <Text style={styles.bottomText}>3 apps clonados</Text>
              <Text style={styles.bottomText}>1 app ativo</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("CarsScreen")}
        >
          <View style={styles.contentBox}>
            <Icon name="car" size={40} color="#fff" style={{ marginTop: 15 }} />
            <Text style={styles.boxText}>Veículos</Text>

            <View style={styles.boxBottomText}>
              <Text style={styles.bottomText}>{ data.carNumbers } Cadastrado</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.boxAdd}
          onPress={() => navigation.navigate("Groups")}
        >
          <View style={styles.teste}>
            <IconAnt
              name="adduser"
              size={50}
              color="#7aa2ff"
              style={{ marginLeft: 15 }}
            />
            <View style={{ width: 230 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={{ marginLeft: 2, color: "black", fontSize: 15 }}>
                  Seu grupo
                </Text>
                <IconAnt name="right" size={20} color="#7aa2ff" />
              </View>

              <Text
                style={{
                  marginLeft: 2,
                  color: "#adadad",
                  overflow: "hidden",
                  fontSize: 12,
                }}
              >
                Inclua um ou mais grupos de contato que serão notificados quando
                o icone clonado for acionado.
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boxAddMargin}
          onPress={() => navigation.navigate("CreateCar")}
        >
          <View style={styles.teste}>
            <Icon
              name="car"
              size={50}
              color="#7aa2ff"
              style={{ marginLeft: 15 }}
            />
            <View style={{ width: 230 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginLeft: 4, color: "black", fontSize: 15 }}>
                  Cadastrar carro
                </Text>
                <IconAnt name="right" size={20} color="#7aa2ff" />
              </View>

              <Text
                style={{
                  marginLeft: 4,
                  color: "#adadad",
                  overflow: "hidden",
                  fontSize: 12,
                }}
              >
                Inclua um ou mais carros que serão utilizados no alerta SOS.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View marginX={'auto'} position={'absolute'} bottom={2} px={5}  >
        <Center>
          <Alert maxW="400" status="info" colorScheme="info">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                <HStack flexShrink={1} space={2} alignItems="center">
                  <Alert.Icon />
                  <Text>
                    Aviso
                  </Text>
                </HStack>
              </HStack>
              <Box pl="6" _text={{
                color: "coolGray.600",
                fontSize: "8"
              }}>
                Coletamos sua localização em segundo plano para disponibilizar a seus contatos a última localização disponível caso seu aparelho seja desligado.
              </Box>
            </VStack>
          </Alert>
        </Center>
      </View>
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5372ef",
  },
  notifications: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: "1.6rem",
    marginRight: "3rem",
    marginLeft: "3rem",
    flexDirection: "row"
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "2rem",
  },
  contentBox: {
    alignItems: "center",
    width: "6.4rem",
    height: "8.6rem",
    borderRadius: "1.25rem",
    backgroundColor: "#7aa2ff",
  },
  contentBoxCenter: {
    alignItems: "center",
    width: "6.4rem",
    height: "8.6rem",
    borderRadius: "1.25rem",
    backgroundColor: "#7aa2ff",
    marginLeft: "0.4rem",
    marginRight: "0.4rem",
  },
  boxText: {
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
  boxBottomText: {
    marginTop: "0.5rem",
  },
  bottomText: {
    color: "#fff",
    fontSize: "0.64rem",
    fontWeight: "400",
  },
  boxAdd: {
    marginTop: "1.5rem",
    width: "20rem",
    height: "6rem",
    borderRadius: "1.25rem",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  boxAddMargin: {
    marginTop: "0.8rem",
    width: "20rem",
    height: "6rem",
    borderRadius: "1.25rem",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  teste: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeScreen;
