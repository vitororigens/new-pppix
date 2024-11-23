import { Container, ContentText, ContentTitle, Icon, SubTitle, Title } from "./styles";

export function CardInfo() {
    return (
        <Container>
            <ContentTitle>
                <Icon name="info-circle" />
                <Title>
                    Aviso
                </Title>
            </ContentTitle>
            <ContentText>
                <SubTitle>
                    Coletamos sua localização em segundo plano para disponibilizar a seus contatos a última localização
                    disponivel caso seu aparelho seja desligado.
                </SubTitle>
            </ContentText>
        </Container>
    )
}