import { useNavigation } from "@react-navigation/native";
import { CardInfo } from "../../components/CardInfo";
import { DefaultContainer } from "../../components/DefaultContainer";
import { FlatCard } from "../../components/FlatCard";
import { PortraitCard } from "../../components/PortraitCard";
import { Container, Content, ContentPortraitCard } from "./styles";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

export function Home() {
  const navigation = useNavigation();
  const { api, load } = useAxios();
  const [data, setData] = useState({
    groupNumbers: 0,
    groupContacts: 0,
    carNumbers: 0
  });

  function handleUpdateData() {
    api
      .get('data/home')
      .then((response: AxiosResponse) => {
        console.log('Dados da API:', response.data);  
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);  
      });
  }

  useEffect(() => {
    if (load) {
      handleUpdateData(); 
    }
  }, [load]);  

  return (
    <DefaultContainer showMenu showButtonGears title="Home">
      <Container>
        <Content>
          <ContentPortraitCard>
            <PortraitCard 
              icon="user"
              subTitle01="Grupos"
              subTitle02="Contatos"
              number01={data.groupNumbers}
              number02={data.groupContacts}
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
              subTitle01="cadastrados"
              number01={data.carNumbers}
              title="Veículos"
              onPress={() => navigation.navigate("cars")}
            />
          </ContentPortraitCard>
          <FlatCard 
            icon="adduser" 
            title="Seu grupo" 
            subTitle="Incluir um ou mais grupos de contato que serão notificados quando o ícone clonado for acionado"
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
  );
}
