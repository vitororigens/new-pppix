import React, { createContext, useEffect, useState } from "react";
import { AuthServices } from "../services/AuthServices";
import { useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface SigninData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  phone: string;
}


export interface AuthData {
    token: string,
    user: {
      email: string,
      phone: string
    }
}

export interface AuthContextDataProps {
  signin: (data: SigninData) => Promise<AuthData | void>;
  signUp: (data: SignupData) => Promise<void>;
  signOut: () => Promise<void>;
  authData: AuthData | null;
  userLogged: boolean;
  securityMode: boolean;
  setSecurityMode: (value: boolean) => void;
}

export const CarContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

function CarProvider({ children }: AuthProviderProps) {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [userLogged, setUserLogged] = useState(false);
  const [securityMode, setSecurityMode] = useState(false);

  const toast = useToast();

  const createCar = () => {
    return new Promise<void>((resolve, reject) => {
        resolve()
    })
  }

  const handleAppStateChange = (nextAppState: any) => {
    // Verificar se esta em background
    if (nextAppState === "background") {
      console.log("Usuario logado auth context: ", userLogged);
      if (!userLogged) {
        console.log("Desativado modo de segurança");
        setSecurityMode(false);
      } else if (userLogged) {
        console.log("Ativado modo de segurança");
        setSecurityMode(true);
      }
    }

    if (appState.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!");
    }

    setAppState(nextAppState);
  };

  async function signin({
    email,
    password,
  }: SigninData): Promise<AuthData | void> {
    
    AuthServices.signIn(email, password)
    .then(async (response) => {
      const auth = { token: response.data.token, ...response.data.user }
      setAuthData(auth);

      await AsyncStorage.setItem("authData", JSON.stringify(auth));

      setUserLogged(true);

      console.log("storaged data: ", auth);

      toast.show({
        title: "Login realizado com sucesso!",
        placement: "top",
        duration: 3000,
        bgColor: "green.500",
      });
    })
    .catch(() => {
      toast.show({
        title: "Verifique suas credenciais",
        placement: "top",
        bgColor: "red.500",
        duration: 5000,
      });
    })
  }

  async function signUp({ email, password, phone }: SignupData) {
    return new Promise<void>((resolve, reject) => {
      AuthServices.signUp(email, password, phone)
      .then(() => {
        resolve()
        toast.show({
          title: "Cadastro realizado com sucessoddd!",
          placement: "top",
          duration: 3000,
          bgColor: "green.500",
        });
      })
      .catch((error:AxiosError) => {
        reject()
        toast.show({
          title: error.response?.data?.errors,
          placement: "top",
          duration: 3000,
          bgColor: "red.500",
        });
      })
    })
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem("authData");
      setUserLogged(false);
      setAuthData(null);
    } catch (error) {
      console.log("Error signOut: ", error);
    }
  }

  async function isLoggedAsync() {
    try {
      const authData = await AsyncStorage.getItem("authData");

      if (authData) {
        console.log("Logado com sucesso (AsyncStorage)");
        setUserLogged(true);
        setAuthData(JSON.parse(authData));
      } else {
        console.log("Não logado");
        setUserLogged(false);
        setSecurityMode(false);
      }
    } catch (error) {
      console.log("Error on isLogged", error);
    }
  }

  return (
    <CarContext.Provider
      value={{
        signin,
        signUp,
        authData,
        signOut,
        userLogged,
        securityMode,
        setSecurityMode
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export default CarProvider;
