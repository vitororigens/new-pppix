import api from "../config/Axios";
import { AuthData } from "../contexts/AuthContext";

async function signIn(email: string, password: string){
  return api
    .post("/auth/signin", {
      email,
      password
    })
}

async function signUp(email: string, password: string, phone: string, name: string, subscribed: string): Promise<AuthData> {
  return api
    .post("auth/register", {
      name,
      email,
      password,
      phone,
      subscribed
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
