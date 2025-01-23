import api from "../config/Axios";
import { AuthData } from "../contexts/AuthContext";

async function signIn(email: string, password: string, subscriptionsids: string) {
  return api
    .post("/auth/signin", {
      email,
      password,
      subscriptionsids
    })
}

async function signUp(email: string, password: string, phone: string, name: string, subscriptionsids: string): Promise<AuthData> {
  return api
    .post("auth/register", {
      name,
      email,
      password,
      phone,
      subscriptionsids
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
