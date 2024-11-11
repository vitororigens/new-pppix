import { ActivityIndicator, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EStyleSheet from "react-native-extended-stylesheet";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { List } from "react-native-paper";
import AccordionGroup from "../components/AccordionGroup";
import { Button } from 'native-base'
import { useAxios } from '../hooks/useAxios'
import { useAuth } from '../hooks/useAuth'
import { useState, useEffect} from 'react'
import { useToast, ScrollView as Scroll, Modal, FormControl, Input } from "native-base";

type UserData = {
  email: string;
  phone: string;

};
interface GroupData {
  group_name: string;
  email: string;
  phone: string;
  leader_id: string;
  users: UserData[];

}


export function GroupScreen() {
  const { api } = useAxios()
  const { authData } = useAuth()
  const toast = useToast();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [editName, setEditName] = useState('');
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);


  async function updateGroups() {
    try {
    await api.get('/group')
    .then((response) => {
      setGroups(response.data.groups)
    })
    } catch (error) {
      console.error('Erro ao obter grupos:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    updateGroups();
  }, []);

  function handleEditGroup(email: string, groupIndex: number) {
    const data = authData?.email === email
    if (data) {
      setEditName(groups[groupIndex].group_name)
      setModalVisible(true)
    }
  }

  function handleSaveGroup() {
    api.post('/group/update', { name: editName })
      .then(() => {
        updateGroups()
        setModalVisible(false)
        toast.show({
          title: "Nome alterado com sucesso!!",
          placement: "top",
          duration: 3000,
          bgColor: "green.500",
        });
      })
  }

  function handleExitGroup(leader_id: string) {
    api.post('/group/exit', { leader_id: leader_id })
      .then(() => {
        updateGroups()
        toast.show({
          title: "Você saiu do grupo!!",
          placement: "top",
          duration: 3000,
          bgColor: "green.500",
        });
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5372ef" />
        </View>
      ) : (
        <>
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Editar Grupo</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Nome</FormControl.Label>
                  <Input value={editName} onChangeText={(text) => setEditName(text)} />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                    setModalVisible(false);
                  }}>
                    Cancelar
                  </Button>
                  <Button onPress={handleSaveGroup}>
                    Salvar
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder={"Buscar Grupos"}
              placeholderTextColor={"#cfcfcf"}
              onChangeText={(text) => setSearch(text)}
            />

            <Icon
              name="magnifier"
              size={25}
              color="black"
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
              }}
            />
          </View>
          <Scroll horizontal
            contentContainerStyle={{
              paddingLeft: 50,
              paddingRight: 5,
            }}
          >
            {groups.map((group, index) => {
              if (!group.group_name.toLowerCase().includes(search) && search != '') {

              } else {
                return (
                  <View style={styles.main} key={index}>
                    <List.Accordion
                      expanded={true}
                      style={{
                        backgroundColor: "#7aa2ff",
                        borderRadius: 10,
                      }}
                      titleStyle={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                        marginLeft: "5%",
                      }}
                      theme={{
                        colors: {
                          background: "transparent",
                        },
                      }}
                      title={group.group_name}
                      onPress={() => handleEditGroup(group.email, index)}
                    >
                      <ScrollView style={{ maxHeight: "80%" }}>
                        {
                          (group.email != authData?.email) ?
                            (
                              <Button
                                w={"full"}
                                mt={4}
                                onPress={() => handleExitGroup(group.leader_id)}
                              >Sair do grupo </Button>
                            )
                            : ''
                        }
                        <AccordionGroup name={(group.email == authData?.email) ? 'Você' : group.email} phone={group.phone} tag='Admin' subTitle="3 contatos" />
                        {group.users.map((user) => {
                          return (
                            <AccordionGroup name={(user.email == authData?.email) ? 'Você' : user.email} phone={user.phone} tag="Participante" subTitle="3 contatos" />
                          )
                        })}
                      </ScrollView>
                    </List.Accordion>
                  </View>
                )
              }
            })}
          </Scroll>
        </>
      )}
    </SafeAreaView>

  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5372ef",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: "8rem",
    height: "4rem",
    width: "19.7rem",
    backgroundColor: "#fff",
    borderRadius: "2rem",
    padding: "1rem",
    paddingLeft: "3.4rem",
    fontSize: "1rem",
  },
  main: {
    width: '19.7rem',
    backgroundColor: "#7aa2ff",
    borderRadius: 20,
    marginTop: 40,
    marginRight: 40,
    maxHeight: "50%",
  }
});

export default GroupScreen;
