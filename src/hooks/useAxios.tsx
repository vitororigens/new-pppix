import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export function useAxios() {
  const context = useContext(AxiosContext);
  return context;
}
