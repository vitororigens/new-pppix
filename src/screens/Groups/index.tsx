import { DefaultContainer } from "../../components/DefaultContainer";
import { GroupCard } from "../../components/GroupCard";
import { Input } from "../../components/Input";
import { ItemGroup } from "../../components/ItemGroup";
import { Container } from "./styles";

export function Groups(){
    return(
        <DefaultContainer title="Grupos" showMenu showButtonBack>
            <Container>
                <Input placeholder="Buscar grupos" showSearch/>
                <GroupCard title="Grupo 01">
                    <ItemGroup subTitle="Você(Admin)" phone="(61) 9 99963966 " />
                </GroupCard>
            </Container>

        </DefaultContainer>
    )
}