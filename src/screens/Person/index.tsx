import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemContact } from "../../components/ItemContact";
import { PersonCard } from "../../components/PersonCard";
import { Container, Content, SubTitle, Title } from "./styles";

export function Person(){
    return(
        <DefaultContainer title="Perfil" showMenu >
            <Container>
                <PersonCard icon="mail" title="E-mail" subTitle="teste@teste.com"/>
                <PersonCard icon="phone" title="Telefone" subTitle="61 9 9996-3966"/>
                <Content>
                    <Title>
                        Suas Senhas
                    </Title>
                    <SubTitle>
                        Senha emergência
                    </SubTitle>
                    <Input placeholder="cadastre sua senha de emergência"/>
                    <SubTitle>
                        Senha banco
                    </SubTitle>
                    <Input placeholder="cadastre sua senha de banco"/>
                    <SubTitle>
                        Senha APP
                    </SubTitle>
                    <Input placeholder="cadastre sua senha de APP"/>
                </Content>
                <Button title="Salvar" type="PRIMARY"/>
            </Container>
        </DefaultContainer>
    )
}