import { useNavigation } from "@react-navigation/native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Checkbox, View, Alert, Center, VStack, HStack, Box } from "native-base";
import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";
import PPP from "../assets/logoPPP.svg";
import { useTogglePasswordVisibility } from "../components/useTogglePasswordVisibility";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "../components/Button";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { signin} = useAuth();

  async function handleLogin() {
    setLoading(true);
    await signin({ email, password });
    setLoading(false);
  }

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Bem-vindo!</Text>
          <PPP width={60} height={70} />
        </View>
      </View>

      <View style={styles.formStyle}>
        <Text style={styles.formText}>
          Faça login na sua conta e comece a sua segurança.
        </Text>
        <TextInput
          placeholder="E-mail"
          style={styles.formEmail}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Senha"
            style={styles.formSenha}
            value={password}
            secureTextEntry={passwordVisibility}
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable
            onPress={handlePasswordVisibility}
            style={{ position: "absolute", right: 25, bottom: 13 }}
          >
            <MaterialCommunityIcons
              name={rightIcon}
              size={22}
              color="#232323"
            />
          </Pressable>
        </View>

        <View style={styles.formForgot}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.passwordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Entrar"
          onPress={handleLogin}
          isLoading={loading}
          mt={5}
        />

        <View style={styles.formCreateAccount}>
          <Text style={styles.noAccountText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
            <Text style={styles.registerText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
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
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: "2rem",
    backgroundColor: "#5372ef",
    height: "8.4rem",
  },
  content: {
    marginTop: "0.7rem",
  },
  logoImage: {
    width: "4rem",
    height: "4rem",
  },
  headerText: {
    fontSize: "1.5rem",
    color: "#fff",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
  formStyle: {
    paddingHorizontal: "2rem",
    marginTop: "1.5rem",
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
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#c0d3ff",
    borderRadius: 30,
    paddingHorizontal: 20,
    width: "100%",
    height: 50,
  },
  formForgot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  formCheckboxText: {
    fontSize: 14,
    fontWeight: "300",
  },
  passwordText: {
    color: "#b058d7",
    fontSize: 15,
  },
  rememberText: {
    fontSize: 18,
    fontWeight: "300",
  },
  formCreateAccount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: "1rem",
  },
  registerText: {
    color: "#b058d7",
    fontSize: 14,
  },
  noAccountText: {
    fontSize: 15,
    marginRight: "0.7rem",
    fontWeight: "300",
  },
  warningText: {
    fontSize: 9,
    marginRight: "0.7rem",
    fontWeight: "300",
  },
  containerButton: {
    width: "100%",
    borderRadius: 30,
    marginTop: 30,
    backgroundColor: "#7aa2ff",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
