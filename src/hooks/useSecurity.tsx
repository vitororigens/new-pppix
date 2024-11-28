import { useContext } from "react";
import { SecurityContext } from "../contexts/SecurityContext";

export function useSecurity() {
  const context = useContext(SecurityContext);

  return context;
}
