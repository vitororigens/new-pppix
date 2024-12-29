import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Loader } from './src/components/Loader';
import { ToastProvider } from 'react-native-toast-notifications';

import theme from './src/theme';
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes/Routes";
import AuthProvider from "./src/contexts/AuthContext";
import AxiosProvider from "./src/contexts/AxiosContext";
import ContactsProvider from "./src/contexts/ContactsContext";
import LocationProvider from "./src/contexts/LocationContext";
import AlertProvider from "./src/contexts/AlertContext";
import firebase from "firebase/compat";
import { firebaseConfig } from "./src/services";

export default function App() {
  const [fontLoader] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); 
}

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <ContactsProvider>
          <AuthProvider>
            <AxiosProvider>
              <LocationProvider>
                <AlertProvider>
                  <GroupProvider>
                    <ToastProvider>
                      {fontLoader ? <Routes /> : <Loader />}
                      <StatusBar style="auto" />
                    </ToastProvider>
                  </GroupProvider>
                </AlertProvider>
              </LocationProvider>
            </AxiosProvider>
          </AuthProvider>
        </ContactsProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
