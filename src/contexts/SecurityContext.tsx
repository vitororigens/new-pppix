import React, { createContext, useState } from "react";
import { AppState } from "react-native";
import { useAuth } from "../hooks/useAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextDataProps {
  appState: "active" | "background" | "inactive" | string;
  securityMode: boolean;
  setSecurityMode: (value: boolean) => void;
}

export const SecurityContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

function SecurityProvider({ children }: AuthProviderProps) {
  const [appState, setAppState] = useState(AppState.currentState);
  const [securityMode, setSecurityMode] = useState(false);

  const { userLogged } = useAuth();

  return (
    <SecurityContext.Provider
      value={{
        appState,
        securityMode,
        setSecurityMode,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
}

export default SecurityProvider;
