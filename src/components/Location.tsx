import { Text, View } from "react-native";

type LocationProps = {
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
};

export function Location({ address, city, state, zipCode }: LocationProps) {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
        }}
      >
        Rua {address}
      </Text>
      <Text
        style={{
          fontSize: 18,
        }}
      >
        Cidade: {city}
      </Text>
      <Text
        style={{
          fontSize: 18,
        }}
      >
        Estado: {state}
      </Text>
      <Text
        style={{
          fontSize: 18,
        }}
      >
        CEP: {zipCode}
      </Text>
    </View>
  );
}
