import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, Content, ContentItems, ContentText, Header, SubTitle, Text, TextColor, Title } from "./styles";
import Logo from "../../assets/Logo_pppix.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { CardInfo } from "../../components/CardInfo";
import { useNavigation } from "@react-navigation/native";

export function Login() {
  const navigation = useNavigation();
  
  return (
    <DefaultContainer>
      <Container>
        <Header>
          <Title>
            Bem vindo!
          </Title>
          <Logo width={60} height={70} />
        </Header>
        <Content>
          <SubTitle>
            Faça seu login na sua conta e comece a sua segurança.
          </SubTitle>
          <Input showIcon name="envelope" placeholder="E-mail" />
          <Input showIcon name="lock" placeholder="Senha" passwordType />
          <TextColor>
            Esqueceu a senha?
          </TextColor>
          <ContentItems>
            <Button title="Entrar" onPress={() => navigation.navigate("home")} />
            <ContentText onPress={() => navigation.navigate("createAccount")}>
              <Text>
                Não tem uma conta?
              </Text>
              <TextColor> Cadastre - se</TextColor>
            </ContentText>
          </ContentItems>
          <CardInfo />
        </Content>
      </Container>
    </DefaultContainer>
  );
}


