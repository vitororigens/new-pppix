import { useNavigation } from "@react-navigation/native";
import { CardInfo } from "../../components/CardInfo";
import { DefaultContainer } from "../../components/DefaultContainer";
import { FlatCard } from "../../components/FlatCard";
import { PortraitCard } from "../../components/PortraitCard";
import { Container, Content, ContentPortraitCard } from "./styles";

export function Home() {
    const navigation = useNavigation();

    return (
        <DefaultContainer showMenu showButtonGears title="Home">
            <Container>
                <Content>
                    <ContentPortraitCard>
                        <PortraitCard icon="user"
                            subTitle01="Grupos"
                            subTitle02="Contatos"
                            title="Grupos"
                            onPress={() => navigation.navigate("groups")}
                        />
                        <PortraitCard
                            icon="appstore-o"
                            subTitle01="Aplicativos"
                            subTitle02="Aplicativos ativos"
                            title="Aplicativos"
                            onPress={() => navigation.navigate("security")}
                        />
                        <PortraitCard
                            icon="car"
                            subTitle01="cdastrados"
                            title="Veículos"
                            onPress={() => navigation.navigate("cars")}
                        />
                    </ContentPortraitCard>
                    <FlatCard 
                    icon="adduser" 
                    title="Seu grupo" 
                    subTitle="Incluir um ou mais grupos de contato que serão notificados quando o icone clonado for acionado"
                    onPress={() => navigation.navigate("createGroup")}
                    />
                    <FlatCard 
                    icon="car" 
                    title="Cadastrar carro" 
                    subTitle="Inclua um ou mais carros que serão utilizados no alerta SOS." 
                    onPress={() => navigation.navigate("createCar")}
                    />
                </Content>
                <CardInfo />
            </Container>
        </DefaultContainer>
    )
}