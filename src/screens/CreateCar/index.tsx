import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemContact } from "../../components/ItemContact";
import { Container, Content } from "./styles";

export function CreateCar(){
    return(
        <DefaultContainer title="Novo Veículo" showMenu showButtonBack>
            <Container>
                <Content>
                    <Input placeholder="Marca"/>
                    <Input placeholder="Modelo"/>
                    <Input placeholder="cor"/>
                    <Input placeholder="Placa"/>
                </Content>
                <Button title="Cadastrar Veículo"/>
            </Container>
        </DefaultContainer>
    )
}