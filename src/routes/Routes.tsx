import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { VerificationRoutes } from "./VerificationRoutes";

export function Routes() {
  const { authData, userLogged, securityMode, loaded } = useAuth();

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

