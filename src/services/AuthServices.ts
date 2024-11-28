import api from "../config/Axios";
import { AuthData } from "../contexts/AuthContext";

async function signIn(email: string, password: string){
  return api
    .post("/auth/signin", {
      email,
      password
    })
}

async function signUp(email: string, password: string, phone: string): Promise<AuthData> {
  return api
    .post("auth/register", {
      email,
      password,
      phone
    })
}

async function signOut() {
  return console.log("signOut");
}

export const AuthServices = {
  signIn,
  signOut,
  signUp,
};
