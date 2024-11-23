import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, Content, ContentItems, ContentText, Header, Icon, SubTitle, Text, TextColor, Title } from "./styles";
import Logo from "../../assets/Logo_pppix.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { CardInfo } from "../../components/CardInfo";

export function CreateAccount() {
  return (
    <DefaultContainer>
      <Container>
        <Header>
          <Title>
            Cadastre - se!
          </Title>
          <Logo width={60} height={70} />
        </Header>
        <Content>
          <SubTitle>
            Cadastre sua conta e comece a sua segurança.
          </SubTitle>
          <Input showIcon name="envelope" placeholder="E-mail" />
          <Input showIcon name="phone" placeholder="Telefone" />
          <Input showIcon name="lock" placeholder="Senha" passwordType />
          <Input showIcon name="lock" placeholder="Confirme sua senha" passwordType />
          <ContentText>
            <Icon name="square-o"/>
          <Text>
            Eu concordo com os termos de política de privacidade?
          </Text>
          </ContentText>
          <ContentItems>
            <Button title="Entrar" />
            <ContentText>
              <Text>
                Já tem uma conta?
              </Text>
              <TextColor> Entrar</TextColor>
            </ContentText>
          </ContentItems>
        </Content>
      </Container>
    </DefaultContainer>
  );
}


