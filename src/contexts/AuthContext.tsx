import React, { createContext, useEffect, useState } from "react";
import { AuthServices } from "../services/AuthServices";
import { useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import api from "../config/Axios";

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

interface User {
  car_id: string;
}

interface AuthData {
  token: string;
  email: string;
  phone: string;
  passwordApp: string;
  passwordEmergecy: string;
  passwordBank: string;
  passwordDevice: string;
  passwordDeviceEmergency: string;
  user: User;
  car_id: string;
}


export interface AuthContextDataProps {
  signin: (data: SigninData) => Promise<AuthData | void>;
  signUp: (data: SignupData) => Promise<void>;
  signOut: () => Promise<void>;
  authData: AuthData | null;
  userLogged: boolean;
  securityMode: boolean;
  setSecurityMode: (value: boolean) => void;
  passwords: string[];
  handleChangePassword: (array: any) => Promise<void>;
  loaded: boolean;
  setAuthData: any;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

function AuthProvider({ children }: AuthProviderProps) {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [passwords, setPassword] = useState(['', '', '']);
  const [appState, setAppState] = useState(AppState.currentState);
  const [userLogged, setUserLogged] = useState(false);
  const [securityMode, setSecurityMode] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      await isLoggedAsync();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const state = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      state.remove();
    };
  }, [userLogged, authData]);

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === "background") {
      if (!userLogged) {
        setSecurityMode(false);
      } else if (userLogged) {
        if (
          authData !== undefined &&
          authData?.passwordApp !== '' &&
          authData?.passwordEmergecy !== '' &&
          authData?.passwordBank !== '' &&
          authData?.passwordDevice !== '' &&
          authData?.passwordDeviceEmergency !== ''
        ) {
          setSecurityMode(true);
        }
      }
    }

    if (
      appState.match(/inactive|background/) &&
      nextAppState === "false"
    ) {
      console.log("O aplicativo voltou para o primeiro plano!");
    }

    setAppState(nextAppState);
  };

  const handleChangePassword = async (array: any) => {
    setPassword(array);
  };

  async function signin({
    email,
    password,
  }: SigninData): Promise<AuthData | void> {
    try {
      const response = await AuthServices.signIn(email, password);
      const auth = { token: response.data.token, ...response.data.user };
      setAuthData(auth);
      await AsyncStorage.setItem("authData", JSON.stringify(auth));

      setUserLogged(true);

      console.log("Dados armazenados: ", auth);

      toast.show({
        title: "Login realizado com sucesso!",
        placement: "top",
        duration: 3000,
        bgColor: "green.500",
      });

      return auth;
    } catch (error) {
      console.error("Erro durante o login:", error);

      toast.show({
        title: "Verifique suas credenciais",
        placement: "top",
        bgColor: "red.500",
        duration: 5000,
      });
    }
  }

  async function signUp({ email, password, phone }: SignupData) {
    try {
      await AuthServices.signUp(email, password, phone);
      toast.show({
        title: "Cadastro realizado com sucesso!",
        placement: "top",
        duration: 3000,
        bgColor: "green.500",
      });
    } catch (error: any) {
      console.error("Erro ao verificar autenticação:", error);
    
      toast.show({
        title: error.response?.data?.errors || "Erro desconhecido",
        placement: "top",
        duration: 3000,
        bgColor: "red.500",
      });
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem("authData");
      setUserLogged(false);
      setAuthData(null);
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  }

  async function isLoggedAsync() {
    try {
      const authDataString = await AsyncStorage.getItem("authData");
      if (authDataString) {
        const data = JSON.parse(authDataString);
        const response = await api.get('auth/check', {
          headers: {
            'Authorization': `Bearer ${data.token}`
          }
        });

        setUserLogged(true);
        setAuthData({
          token: data.token,
            ...response.data.user,
            passwordApp: response.data.user.passwordApp || '',
            passwordEmergecy: response.data.user.passwordEmergecy || '',
            passwordBank: response.data.user.passwordBank || '',
            passwordDevice: response.data.user.passwordDevice || '',
            passwordDeviceEmergency: response.data.user.passwordDeviceEmergency || ''
          
        });

        if (
          response.data.user.passwordApp !== '' &&
          response.data.user.passwordEmergecy !== '' &&
          response.data.user.passwordBank !== '' &&
          response.data.user.passwordDevice || '' &&
          response.data.user.passwordDeviceEmergency || ''
        ) {
          setSecurityMode(true);
        }
        setLoaded(true);
      } else {
        setUserLogged(false);
        setSecurityMode(false);
        setLoaded(true);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signin,
        signUp,
        authData,
        signOut,
        userLogged,
        securityMode,
        setSecurityMode,
        passwords,
        handleChangePassword,
        loaded,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
