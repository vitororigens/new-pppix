import { DefaultContainer } from "../../components/DefaultContainer";
import { PersonCard } from "../../components/PersonCard";
import { SecurityCard } from "../../components/SecurityCard";
import { Container, Content, SubTitle, Title } from "./styles";

export function Security(){
    return(
        <DefaultContainer title="Perfil" showMenu >
            <Container>
                <SecurityCard icon="mail" title="Nubank" subTitle="252 mb"/>
            </Container>
        </DefaultContainer>
    )
}