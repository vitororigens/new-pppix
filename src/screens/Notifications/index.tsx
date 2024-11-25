import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemContact } from "../../components/ItemContact";
import { Container, Content } from "./styles";

export function Notifications(){
    return(
        <DefaultContainer title="Notificações" showMenu showButtonBack>
            <Container>
                <Input placeholder="Pesquisar" showSearch />
                <Content>
                </Content>
                <Button title="Limpar"/>
            </Container>
        </DefaultContainer>
    )
}