import { CardInfo } from "../../components/CardInfo";
import { DefaultContainer } from "../../components/DefaultContainer";
import { PortraitCard } from "../../components/PortraitCard";
import { Container, ContentPortraitCard } from "./styles";

export function Home() {
    return (
        <DefaultContainer showMenu showButtonGears title="Home">
            <Container>
                <ContentPortraitCard>
                    <PortraitCard />
                    <PortraitCard />
                    <PortraitCard />
                </ContentPortraitCard>
                <CardInfo />
            </Container>
        </DefaultContainer>
    )
}