import { NavigationContainer } from "@react-navigation/native";
import { AppState } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useContacts } from "../hooks/useContacts";
import { useSecurity } from "../hooks/useSecurity";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { VerificationRoutes } from "./VerificationRoutes";

export function Routes() {
  const [appState, setAppState] = useState(AppState.currentState);
  const { authData, userLogged, securityMode, loaded } = useAuth();
  console.log(authData, userLogged, securityMode, loaded);

  if (securityMode && userLogged) {
    return (
        <VerificationRoutes />
    );
  }

  if (!securityMode && loaded) {
    return (
        authData ? <AppRoutes /> : <AuthRoutes />
    );
}

}
