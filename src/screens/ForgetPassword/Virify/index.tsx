import { Container, Content,  ContentItems, SubTitle, Text} from "./styles";
import { DefaultContainer } from "../../../components/DefaultContainer";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export function Verify() {
  return (
    <DefaultContainer showMenu showButtonBack title="Alterar senha"> 
      <Container>
        <Content>
          <SubTitle>
          Esqueceu sua senha? Sem problemas! Vamos te ajudar a redefini-la.
          </SubTitle>
          <Text>
          Por favor, insira o e-mail cadastrado e enviaremos um link para criar uma nova senha.
          </Text>
          <Input showIcon name="envelope" placeholder="E-mail" />
          <ContentItems>
            <Button title="Enviar email" />
          </ContentItems>
        </Content>
      </Container>
    </DefaultContainer>
  );
}


