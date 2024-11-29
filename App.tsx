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

export default function App() {
  const [fontLoader] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastProvider>
          {fontLoader ? <Routes /> : <Loader />}
          <StatusBar style="auto" />
        </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
