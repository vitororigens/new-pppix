import { Button, Text, VStack } from "native-base";
import { Alert } from "react-native";
import { openApp } from "react-native-send-intent";

export function IntentSend() {
  const openAppTest = async () => {
    openApp("com.android.chrome", {}).then((isOpened) => {
      if (isOpened) {
        Alert.alert("App is opened");
      } else {
        Alert.alert("App is not installed");
      }
    });
  };

  return (
    <VStack
      flex={1}
      bgColor="gray.800"
      alignItems={"center"}
      justifyContent="center"
    >
      <Button colorScheme="blue" onPress={openAppTest}>
        <Text>Send</Text>
      </Button>
    </VStack>
  );
}
