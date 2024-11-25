import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemContact } from "../../components/ItemContact";
import { Container, Content } from "./styles";

export function CreateGroup(){
    return(
        <DefaultContainer title="Criar grupo" showMenu showButtonBack>
            <Container>
                <Input placeholder="Pesquisar" showSearch />
                <Content>
                <ItemContact/>
                </Content>
                <Button title="Criar grupo"/>
            </Container>
        </DefaultContainer>
    )
}