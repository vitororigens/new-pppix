import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, Header, Title } from "./styles";
import Logo from "../../assets/Logo_pppix.svg";

export function Login() {
  return (
    <DefaultContainer>
      <Container>
        <Header>
          <Title>
            Bem vindo!
          </Title>
          <Logo width={60} height={70} />
        </Header>
        </Container>
    </DefaultContainer>
  );
}


