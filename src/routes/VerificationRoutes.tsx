import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Verification from "../screens/Verification";


const Stack = createNativeStackNavigator();

export function VerificationRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}
