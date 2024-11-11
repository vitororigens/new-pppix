import React, { useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";
import LottieView from "lottie-react-native";
import AnimationLock from "../../assets/lock-animation.json";

interface RouteParams {
  email: string;
  code: string;
}

const PassLoading = () => {
  const navigation = useNavigation();
  const animation = useRef(null);

  const toast = useToast();
  const route = useRoute();

  const { email, code } = route.params as RouteParams;

  useEffect(() => {
    toast.show({
      title: "Verificando...",
      placement: "top",
      bgColor: "orange.500",
    });

    setTimeout(() => {
      toast.show({
        title: "Código verificado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.navigate("SuccessPassword", { email, code });
    }, 5200);
  }, []);

  return (
    <VStack flex={1} alignItems={"center"} justifyContent="center">
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
      <Heading mt={4} fontSize={"sm"}>
        Aguarde enquanto verificamos o seu código
      </Heading>
    </VStack>
  );
};

export default PassLoading;
