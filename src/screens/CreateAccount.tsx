import { Checkbox, useToast } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import PPP from "../assets/logoPPP.svg";
import { useTogglePasswordVisibility } from "../components/useTogglePasswordVisibility";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";
import MaskInput from 'react-native-mask-input';


export function CreateAccount() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirm] = useState("");
  const [politcyTerms, setPolitcyTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigation = useNavigation();
  const { signUp } = useAuth();

  async function handleSignup() {
    setLoading(true);
    if (!politcyTerms) {
      setLoading(false);
      toast.show({
        title: "É necessario aceitar os termos de uso!!",
        placement: "top",
        bgColor: "red.500",
        duration: 5000,
      });
      return
    }

    if (password !== passwordConfirmation) {
      setLoading(false);
      toast.show({
        title: "Senhas não conferem!",
        placement: "top",
        bgColor: "red.500",
        duration: 5000,
      });
      return;
    }

    if (email == '' || password == '' || phone == '') {
      toast.show({
        title: "Por favor preencha todos os campos!",
        placement: "top",
        bgColor: "red.500",
        duration: 5000,
      });
      setLoading(false);
      return;
    }

    signUp({ email, password, phone })
      .then(() => {
        navigation.navigate("signIn");
      })
      .catch(() => {
        console.log('Erro')
      })



    setLoading(false);
  }

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Cadastre-se!</Text>
          <PPP width={55} height={65} />
        </View>
      </View>

      <View style={styles.formStyle}>
        <Text style={styles.formText}>
          Gerenciamento do seu aplicativo é muito fácil e melhor, seguro!
        </Text>
        <MaskInput
          placeholder="Telefone"
          style={styles.formEmail}
          value={phone}
          onChangeText={(masked, unmasked) => setPhone(unmasked)}
          mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        />
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Confirmação de senha"
            style={styles.formSenha}
            value={passwordConfirmation}
            secureTextEntry={passwordVisibility}
            onChangeText={(text) => setPasswordConfirm(text)}
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
          <View style={styles.formCheckbox}>
            <Checkbox
              colorScheme="cyan"
              size="sm"
              value={"teste"}
              onChange={(value) => setPolitcyTerms(value)}
              aria-label="Eu concordo com os termos de política de privacidade"
            />

            <Text style={{
              marginLeft:5
            }}>
              Eu concordo com os termos de política de privacidade.
            </Text>
          </View>
        </View>

        <Button
          title="Cadastrar"
          onPress={handleSignup}
          isLoading={loading}
          mt={5}
        />

        <View style={styles.formCreateAccount}>
          <Text style={styles.noAccountText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
            <Text style={styles.registerText}>Entrar</Text>
          </TouchableOpacity>
        </View>
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
    height: "8rem",
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
    marginTop: "1rem",
  },
  formStyle: {
    paddingHorizontal: "2rem",
    marginTop: "1.4rem",
  },
  formText: {
    fontSize: "1rem",
    color: "#C4BABA",
    overflow: "hidden",
  },
  formSenha: {
    marginTop: "5%",
    borderWidth: 1,
    borderColor: "#c0d3ff",
    borderRadius: 30,
    paddingHorizontal: "1rem",
    width: "100%",
    height: "3rem",
  },
  formEmail: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#c0d3ff",
    borderRadius: 30,
    paddingHorizontal: "1rem",
    width: "100%",
    height: "3rem",
  },
  formForgot: {
    marginTop: "1rem",
    width: "90%",
    alingItems: "center",
  },
  formCheckbox: {
    alingItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  formCheckboxText: {
    overflow: "hidden",
    fontWeight: "300",
  },
  formLogin: {
    borderRadius: 30,
    backgroundColor: "#7aa2ff",
  },
  formCreateAccount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
    paddingHorizontal: "10%",
  },
  registerText: {
    color: "#b058d7",
    fontSize: 17,
  },
  noAccountText: {
    fontSize: 18,
    fontWeight: "300",
    marginRight: 25,
  },
  containerButton: {
    width: "100%",
    borderRadius: 30,
    marginTop: "1.4rem",
    backgroundColor: "#7aa2ff",
    height: "3rem",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
