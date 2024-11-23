import { Container, Content,  ContentItems, SubTitle, Text} from "./styles";
import { DefaultContainer } from "../../../components/DefaultContainer";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export function Sucess() {
  return (
    <DefaultContainer showMenu showButtonBack title="Alterar senha"> 
      <Container>
        <Content>
          <SubTitle>
          Cadastre sua nova senha.
          </SubTitle>
          <Input showIcon name="lock" placeholder="Senha" passwordType />
          <Input showIcon name="lock" placeholder="Confirme sua senha" passwordType />
          <ContentItems>
            <Button title="Enviar redefinição" />
          </ContentItems>
        </Content>
      </Container>
    </DefaultContainer>
  );
}


