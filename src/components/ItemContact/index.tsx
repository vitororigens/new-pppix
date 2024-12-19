import { Switch } from "../Switch";
import { Container, Content, StyledIcon, SubTitle, Text, Title, Button, SendIcon } from "./styles";

type ItemContactProps = {
  name: string;
  phone: string;
  onToggle?: (value: boolean) => void;
  isToggled?: boolean;
  buttonSend?: () => void;
};

export function ItemContact({ name, phone, onToggle, isToggled, buttonSend }: ItemContactProps) {
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
      {onToggle &&
        <Switch value={isToggled} onValueChange={onToggle} />
      }
      {buttonSend && (
        <Button onPress={buttonSend}>
          <SendIcon name="send" />
        </Button>
      )}
    </Container>
  );
}
