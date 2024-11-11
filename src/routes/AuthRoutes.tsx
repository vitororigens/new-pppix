import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateAccount } from "../screens/CreateAccount";

import ForgotPassword from "../screens/ForgetPassword/Index";
import PassLoading from "../screens/ForgetPassword/PassLoading";
import SuccessPassword from "../screens/ForgetPassword/Success/Index";
import VerifyPassword from "../screens/ForgetPassword/Verify/Index";
import { Login } from "../screens/Login";

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signIn" component={Login} />
      <Stack.Screen name="signUp" component={CreateAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyPassword" component={VerifyPassword} />
      <Stack.Screen name="SuccessPassword" component={SuccessPassword} />
      <Stack.Screen name="PassLoading" component={PassLoading} />
    </Stack.Navigator>
  );
}
