import { useContext } from "react";
import { CarContext } from "../contexts/CarContext";

export function useCar() {
  const context = useContext(CarContext);
  return context;
}
