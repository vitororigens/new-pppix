
import React from "react";
import { Button, Container, Content, Icon, Menu, SubTitle, Title } from "./styles";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

type PropsDefaultContainer = {
  children?: React.ReactNode;
  title?: string;
  showButtonGears?: boolean;
  showButtonBack?: boolean;
  showButtonEdit?: boolean;
  showMenu?: boolean;
  onEdit?: () => void;
  onBack?: () => void;
}

export function DefaultContainer({ children, title, showButtonGears, showButtonBack, showButtonEdit, onEdit, onBack, showMenu }: PropsDefaultContainer) {
  const navigation = useNavigation()
  const {signOut} = useAuth()

  function HandleSignOut() {
    signOut()
  }


  function HandleGoBack() {
    navigation.goBack()

  }

  return (
    <Container>
      {showMenu &&
        <Menu>
          {showButtonBack &&
            <Button onPress={!!onBack ? onBack : HandleGoBack}>
              <Icon name="arrow-left" />
            </Button>
          }
          <View>
            <Title>{title}</Title>
          </View>
          {showButtonGears &&
            <Content>
              <Button onPress={() => navigation.navigate("notifications")}>
                <Icon name="bell" />
              </Button>
              <Button onPress={HandleSignOut}>
                <Icon name="sign-out" />
              </Button>
            </Content>
          }
          {showButtonEdit &&
            <Button onPress={onEdit}>
              <SubTitle>
                Editar
              </SubTitle>
            </Button>
          }
        </Menu>
      }
      {children}
    </Container>
  )
}