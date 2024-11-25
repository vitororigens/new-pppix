import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateAccount } from "../screens/CreateAccount";
import { Login } from "../screens/Login";
import { Verify } from "../screens/ForgetPassword/Virify";
import { Sucess } from "../screens/ForgetPassword/Sucess";
import { AppRoutes } from "./AppRoutes";

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="createAccount" component={CreateAccount} />
      <Stack.Screen name="verify" component={Verify} />
      <Stack.Screen name="sucess" component={Sucess} />
      <Stack.Screen name="home" component={AppRoutes} />
    </Stack.Navigator>
  );
}
