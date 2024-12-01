import { Switch } from "../Switch";
import { Container, Content, StyledIcon, SubTitle, Text, Title } from "./styles";

type ItemContactProps = {
  name: string;
  phone: string;
  onToggle: (value: boolean) => void;
  isToggled: boolean;
};

export function ItemContact({ name, phone, onToggle, isToggled }: ItemContactProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <Container>
      <StyledIcon>
        <Text>{initial}</Text>
      </StyledIcon>
      <Content>
        <Title>{name}</Title>
        <SubTitle>{phone}</SubTitle>
      </Content>
      <Switch onValueChange={onToggle} value={isToggled} />
    </Container>
  );
}
