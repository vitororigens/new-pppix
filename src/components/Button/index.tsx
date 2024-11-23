import { TouchableOpacityProps } from "react-native";
import { ButtonTypeProps, Container, Loading, Title } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeProps;
  isLoading?: boolean;
};

export function Button({ type = "PRIMARY", title, onPress, isLoading = false }: ButtonProps) {
  return (
    <Container onPress={onPress} type={type} disabled={isLoading}>
      {isLoading ? <Loading /> : <Title>{title}</Title>}
    </Container>
  );
}
