import React, { createContext, SetStateAction, useEffect, useState } from "react";
import { AuthServices } from "../services/AuthServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import api from "../config/Axios";
import { Toast } from "react-native-toast-notifications";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface SigninData {
  email: string;
  password: string;
  subscriptionsids: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  subscriptionsids: string;
}

interface User {
  car_id: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
}

export interface AuthData {
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
  subscriptionsids: string;
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
  handleChangePassword: (array: string[]) => Promise<void>;
  loaded: boolean;
  setAuthData: React.Dispatch<React.SetStateAction<AuthData | null>>;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

function AuthProvider({ children }: AuthProviderProps) {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  console.log('authData', authData);
  const [passwords, setPasswords] = useState(["", "", ""]);
  const [appState, setAppState] = useState(AppState.currentState);
  const [userLogged, setUserLogged] = useState(false);
  const [securityMode, setSecurityMode] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    isLoggedAsync();
  }, []);

  useEffect(() => {
    const stateListener = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      stateListener.remove();
    };
  }, [userLogged, authData]);

  const handleAppStateChange = (nextAppState: SetStateAction<"active" | "background" | "inactive" | "unknown" | "extension">) => {
    if (nextAppState === "background" && userLogged && authData) {
      const passwordsFilled =
        authData.passwordApp &&
        authData.passwordEmergecy &&
        authData.passwordBank &&
        authData.passwordDevice &&
        authData.passwordDeviceEmergency;

      setSecurityMode(passwordsFilled);
    }
    setAppState(nextAppState);
  };

  const handleChangePassword = async (array: string[]) => {
    setPasswords(array);
  };

  const signin = async ({ email, password, subscriptionsids }: SigninData): Promise<AuthData | void> => {
    try {
      const response = await AuthServices.signIn(email, password, subscriptionsids);
      const auth = { token: response.data.token, ...response.data.user };
      setAuthData(auth);
      await AsyncStorage.setItem("authData", JSON.stringify(auth));

      setUserLogged(true);
      Toast.show("Login realizado com sucesso!", {
        type: "success",
        duration: 3000,
        placement: "top",
      });

      return auth;
    } catch (error) {
      console.error("Erro durante o login:", error);
      Toast.show("Verifique suas credenciais!", {
        type: "danger",
        duration: 3000,
        placement: "top",
      });
    }
  };

  const signUp = async ({ email, password, phone, name, subscriptionsids }: SignupData) => {
    try {
      await AuthServices.signUp(email, password, phone, name, subscriptionsids);
      Toast.show("Cadastro realizado com sucesso!", {
        type: "success",
        duration: 3000,
        placement: "top",
      });
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      Toast.show(error.response?.data?.errors || "Erro desconhecido", {
        type: "danger",
        duration: 3000,
        placement: "top",
      });
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("authData");
      setUserLogged(false);
      setAuthData(null);
      Toast.show("Logout realizado com sucesso!", {
        type: "success",
        duration: 3000,
        placement: "top",
      });
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  };

  const isLoggedAsync = async () => {
    try {
      const authDataString = await AsyncStorage.getItem("authData");
      if (authDataString) {
        const data = JSON.parse(authDataString);
        const response = await api.get("auth/check", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const userData = response.data.user;
        const updatedAuthData = {
          token: data.token,
          ...userData,
        };

        setAuthData(updatedAuthData);
        setUserLogged(true);

        const passwordsFilled =
          userData.passwordApp &&
          userData.passwordEmergecy &&
          userData.passwordBank &&
          userData.passwordDevice &&
          userData.passwordDeviceEmergency;

        setSecurityMode(passwordsFilled);
      } else {
        setUserLogged(false);
        setSecurityMode(false);
      }
      setLoaded(true);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    }
  };

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
