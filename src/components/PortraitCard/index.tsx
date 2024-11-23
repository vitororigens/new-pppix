import { Container, Icon, SubTitle, Title } from "./styles";

export function PortraitCard(){
    return(
        <Container>
            <Icon name="user"/>
            <Title>
                Grupos
            </Title>
            <SubTitle>
                0 grupos
            </SubTitle>
            <SubTitle>
                0 Contatos
            </SubTitle>
        </Container>
    )
}