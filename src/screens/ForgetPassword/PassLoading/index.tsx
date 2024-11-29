import { useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import AnimationLock from "../../../assets/lock-animation.json";
import { Container, Text } from "./styles";
import { Toast } from "react-native-toast-notifications";


interface RouteParams {
  email: string;
  code: string;
}

export function PassLoading() {
  const navigation = useNavigation();
  const animation = useRef(null);
  const route = useRoute();

  const { email, code } = route.params as RouteParams;

  useEffect(() => {
    Toast.show("Verificando...", {
      placement: "top",
      type: "success",
      duration: 5000,
    });

    setTimeout(() => {
      Toast.show("Código verificado com sucesso", {
        placement: "top",
        type: "success",
        duration: 5000,
      });

      navigation.navigate("sucess", { email, code });
    }, 5200);
  }, []);

  return (
    <Container>
      <LottieView
        autoPlay
        loop={true}
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={AnimationLock}
      />
      <Text>
        Aguarde enquanto verificamos o seu código
      </Text>
    </Container>
  );
};
