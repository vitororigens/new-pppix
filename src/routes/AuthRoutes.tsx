import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateAccount } from "../screens/CreateAccount";
import { Login } from "../screens/Login";
import { Verify } from "../screens/ForgetPassword/Virify";
import { Sucess } from "../screens/ForgetPassword/Sucess";
import { AppRoutes } from "./AppRoutes";
import { ForgetPassword } from "../screens/ForgetPassword";
import { PassLoading } from "../screens/ForgetPassword/PassLoading";

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="createAccount" component={CreateAccount} />
      <Stack.Screen name="verify" component={Verify} />
      <Stack.Screen name="sucess" component={Sucess} />
      <Stack.Screen name="forgetpassword" component={ForgetPassword} />
      <Stack.Screen name="passloading" component={PassLoading} />
    </Stack.Navigator>
  );
}
