import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemCar } from "../../components/ItemCar";
import { Container, Content } from "./styles";

export function Cars(){
    return(
        <DefaultContainer title="Selecionar carro" showMenu showButtonBack>
            <Container>
                <Input placeholder="Pesquisar" showSearch />
                <Content>
                <ItemCar/>
                </Content>
                <Button title="Salvar"/>
            </Container>
        </DefaultContainer>
    )
}