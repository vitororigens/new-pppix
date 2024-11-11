import {View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Text as TextReact} from 'react-native'
import { Box, Flex, Switch, Text} from 'native-base'
import EStyleSheet from "react-native-extended-stylesheet";
import IconAnt from "react-native-vector-icons/AntDesign";
import {useAuth} from '../hooks/useAuth'
import {useAxios} from '../hooks/useAxios'
import {useState } from 'react';
import { useToast } from "native-base";

export default function Person() {
    const { authData, setAuthData } = useAuth()
    const { api } = useAxios()
    const toast = useToast();
    
    const [passwordEmergecy, setPasswordEmergecy] = useState(authData?.passwordEmergecy)
    const [passwordBank, setPasswordBank] = useState(authData?.passwordBank)
    const [passwordApp, setPasswordApp] = useState(authData?.passwordApp)
    const [passwordDevice, setPasswordDevice] = useState(authData?.passwordDevice)
    const [passwordDeviceEmergency, setPasswordDeviceEmergency] = useState(authData?.passwordDeviceEmergency)
    
    // const [isSwitchOn, setIsSwitchOn] = useState(false);

    function handleSavePasswords() {

        api.post('user/change/passwords', { passwordApp, passwordEmergecy, passwordBank, passwordDevice, passwordDeviceEmergency })
        .then(() => {
            setAuthData({ ...authData, user:{ ...authData, passwordApp, passwordEmergecy, passwordBank, passwordDevice, passwordDeviceEmergency} })
            toast.show({
                title: "Senhas alteradas com sucesso!",
                placement: "top",
                duration: 3000,
                bgColor: "green.500",
            });
        })
        
        
    }
    // const toggleSwitch = () => {
    //     setIsSwitchOn(previousState => !previousState);
    // };

    
    
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    height: '100%',
                    width: "100%",
                    paddingTop: 50,
                    alignItems: 'center'
                }}
            >
                <ScrollView
                contentContainerStyle={{
                    paddingBottom:50
                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
            >
            <Flex
                bgColor={"violet.500"}
                mb={2}
                p={6}
                rounded="md"
                shadow="md" 
                overflow="hidden"
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                style={styles.input}
            >
                <Flex flexDir={"row"} alignItems="center">
                <Box marginRight={2}>
                <IconAnt
                    name="mail"
                    size={40}
                    color="#fff"
                    style={{ marginTop: 15 }}
                />
                </Box>
                <Box>
                    <Text fontFamily={"medium"} color={"white.100"}>
                        Email
                    </Text>
                    <Text fontFamily={"body"} color={"white"}>
                        { authData?.email }
                    </Text>
                </Box>
                </Flex>

                <Flex flex={1} alignItems="flex-end">
                </Flex>
            </Flex>
            <Flex
                bgColor={"violet.500"}
                mb={2}
                p={6}
                rounded="md"
                shadow="md"
                overflow="hidden"
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                style={styles.input}
            >
                <Flex flexDir={"row"} alignItems="center">
                <Box marginRight={2}>
                <IconAnt
                    name="phone"
                    size={40}
                    color="#fff"
                    style={{ marginTop: 15 }}
                />
                </Box>
                <Box>
                    <Text fontFamily={"medium"} color={"white.100"}>
                        Telefone
                    </Text>
                    <Text fontFamily={"body"} color={"white"}>
                        { authData?.phone }
                    </Text>
                </Box>
                </Flex>

                <Flex flex={1} alignItems="flex-end">
                </Flex>
            </Flex>
            <View style={styles.content}>
                <View style={{ marginTop: 10 }}>
                    <TextReact style={{ fontSize: 26, fontWeight: "bold" }}>Suas senhas</TextReact>
                </View>
                <View style={styles.formStyle}>
                    <View
                        style={{
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        }}
                    > 
                        <Text style={styles.label}>Senha emergência</Text>
                        <TextInput
                        placeholder="Modelo"
                        style={styles.formSenha}
                        value={passwordEmergecy}
                        onChangeText={(text) => setPasswordEmergecy(text)}
                        />
                        <Text style={styles.label}>Senha Banco</Text>
                        <TextInput
                        placeholder="Modelo"
                        style={styles.formSenha}
                        value={passwordBank}
                        onChangeText={(text) => setPasswordBank(text)}
                        />
                        <Text style={styles.label}>Senha App</Text>
                        <TextInput
                        placeholder="Modelo"
                        style={styles.formSenha}
                        value={passwordApp}
                        onChangeText={(text) => setPasswordApp(text)}
                        />
                        {/* <Text style={styles.label}>Senha de Tela de Bloqueio</Text>
                        <TextInput
                        placeholder="Modelo"
                        style={styles.formSenha}
                        value={passwordDevice}
                        onChangeText={(text) => setPasswordDevice(text)}
                        />
                         <Text style={styles.label}>Senha de Tela de Bloqueio de Emergência</Text>
                        <TextInput
                        placeholder="Modelo"
                        style={styles.formSenha}
                        value={passwordDeviceEmergency}
                        onChangeText={(text) => setPasswordDeviceEmergency(text)}
                        /> */}
                        <View style={{
                            marginTop: 10,
                            width: '100%',
                            alignItems:'flex-start'
                        }}>
                        {/* <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isSwitchOn ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isSwitchOn}
                                
                         /> */}
                        </View>

                    </View>
                  
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleSavePasswords()}
            >
                <View style={styles.containerButton}>
                <Text style={styles.textButton}>Salvar</Text>
                </View>
            </TouchableOpacity>
            </ScrollView>

            </View>
        </SafeAreaView>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5372ef",
        alignItems: "center",
    },
    content: {
      alignItems: "center",
      marginTop: "0.5rem",
      width: "19.7rem",
      backgroundColor: "#fff",
      padding: "1rem",
      borderRadius: 10,
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
        borderWidth: 1,
        borderColor: "#c0d3ff",
        borderRadius: 30,
        paddingHorizontal: "1.5rem",
        width: "100%",
        height: 50,
      },
      formEmail: {
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
      label: {
        marginRight: 'auto',
        marginLeft: 10,
        marginTop: '1rem',
        marginBottom: 10
      },
      input: {
        width: '19.7rem'
      }
});