import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Contacts } from "../screens/Contacts";
import Security from "../screens/Security";
import HomeScreen from "../screens/HomeScreen";
import { IntentSend } from "../screens/IntentSend";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateCar from "../screens/CreateCar";
import CarsScreen from "../screens/CarsScreen";
import CreateGroup from "../screens/CreateGroup";
import { Notifications } from "../screens/Notifications";
import GroupScreen from "../screens/GroupScreen";
import Person from "../screens/Person";
import { AlertContext } from "../../src/contexts/AlertContext"
import {useContext} from 'react'

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function TabsApp() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => {
          return null;
        },
      }}
    >
      <Tabs.Screen
        name="HomeApp"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Security"
        component={Security}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={"lock-closed-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="IntentSend"
        component={Person}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Tests"
        component={IntentSend}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={"settings-outline"} color={color} size={size} />
          ),
        }}
      /> */}
    </Tabs.Navigator>
  );
}

export function AppRoutes() {
  const alert = useContext(AlertContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={TabsApp} />
      <Stack.Screen name="IntentSend" component={IntentSend} />
      <Stack.Screen name="CreateCar" component={CreateCar} />
      <Stack.Screen name="CarsScreen" component={CarsScreen} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Groups" component={Contacts} />
      <Stack.Screen name="GroupScreen" component={GroupScreen} />
      <Stack.Screen name="Security" component={Security} />
    </Stack.Navigator>
  );
}
