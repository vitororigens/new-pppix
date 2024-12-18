import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from '@expo/vector-icons/Ionicons';
import { useContext } from 'react'
import { Home } from "../screens/Home";
import { Person } from "../screens/Person";
import { CreateCar } from "../screens/CreateCar";
import { Cars } from "../screens/Cars";
import { CreateGroup } from "../screens/CreateGroup";
import { Groups } from "../screens/Groups";
import { Security } from "../screens/Security";
import { Notifications } from "../screens/Notifications";

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
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="security"
        component={Security}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="lock-closed-outline" color={color} size={size} />
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
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={TabsApp} />
      <Stack.Screen name="createCar" component={CreateCar} />
      <Stack.Screen name="cars" component={Cars} />
      <Stack.Screen name="createGroup" component={CreateGroup} />
      <Stack.Screen name="groups" component={Groups} />
      <Stack.Screen name="security" component={Security} />
      <Stack.Screen name="notifications" component={Notifications} />
    </Stack.Navigator>
  );
}
