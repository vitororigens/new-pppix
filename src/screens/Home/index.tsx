import { CardInfo } from "../../components/CardInfo";
import { DefaultContainer } from "../../components/DefaultContainer";
import { FlatCard } from "../../components/FlatCard";
import { PortraitCard } from "../../components/PortraitCard";
import { Container, Content, ContentPortraitCard } from "./styles";

export function Home() {
    return (
        <DefaultContainer showMenu showButtonGears title="Home">
            <Container>
                <Content>
                    <ContentPortraitCard>
                        <PortraitCard icon="user" subTitle01="Grupos" subTitle02="Contatos" title="Grupos" />
                        <PortraitCard icon="appstore-o" subTitle01="Aplicativos" subTitle02="Aplicativos ativos" title="Aplicativos" />
                        <PortraitCard icon="car" subTitle01="cdastrados" title="Veículos" />
                    </ContentPortraitCard>
                    <FlatCard icon="adduser" title="Seu grupo" subTitle="Incluir um ou mais grupos de contato que serão notificados quando o icone clonado for acionado" />
                    <FlatCard icon="car" title="Cadastrar carro" subTitle="Inclua um ou mais carros que serão utilizados no alerta SOS." />
                </Content>
                <CardInfo />
            </Container>
        </DefaultContainer>
    )
}