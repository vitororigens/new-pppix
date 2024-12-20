import { useState, useEffect } from "react";
import { DefaultContainer } from "../../components/DefaultContainer";
import { GroupCard } from "../../components/GroupCard";
import { Input } from "../../components/Input";
import { ItemGroup } from "../../components/ItemGroup";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { Container } from "./styles";
import { Toast } from "react-native-toast-notifications";
import { EditFieldModal } from "../../components/EditFieldModal";
import { ScrollView } from "react-native";

interface UserData {
  email: string;
  phone: string;
}

interface GroupData {
  group_name: string;
  email: string;
  phone: string;
  leader_id: string;
  users: UserData[];
}

export function Groups() {
  const { api } = useAxios();
  const { authData } = useAuth();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [editName, setEditName] = useState("");
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  async function updateGroups() {
    try {
      const response = await api.get('/group');
      setGroups(response.data.groups);
    } catch (error) {
      console.error('Erro ao obter grupos:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    updateGroups();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      const groupToEdit = groups.find((group) => group.group_name === editName);
      if (groupToEdit) {
        setEditName(groupToEdit.group_name);
      }
    }
  }, [modalVisible, groups]);
  

  function handleEditGroup(email: string, groupIndex: number) {
    if (authData?.email === email) {
      setEditName(groups[groupIndex].group_name);
      setModalVisible(true);
    }
  }

  async function handleSaveGroup() {
    try {
      console.log("Payload enviado:", { name: editName });
      await api.post("/group/update", { name: editName });
      await updateGroups();
      setModalVisible(false);
      Toast.show("Nome alterado com sucesso!", {
        placement: "top",
        duration: 3000,
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao salvar grupo:", error);
    }
  }


  async function handleExitGroup(leader_id: string) {
    try {
      await api.post('/group/exit', { leader_id: leader_id });

      updateGroups();

      Toast.show("Você saiu do grupo!", {
        placement: "top",
        duration: 3000,
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao sair do grupo:", error);

      Toast.show("Erro ao sair do grupo.", {
        placement: "top",
        duration: 3000,
        type: "danger",
      });
    }
  }

  console.log(groups)

  const filteredGroups = groups.filter(
    (group) =>
      group.group_name?.toLowerCase().includes(search.toLowerCase()) ||
      (!group.group_name && search === "")
  );
  
  

  return (
    <DefaultContainer title="Grupos" showMenu showButtonBack>
      <Container>
        <Input
          placeholder="Buscar grupos"
          value={search}
          onChangeText={setSearch}
          showSearch
        />

        {filteredGroups.map((group, index) => (
          <GroupCard 
            key={group.leader_id} 
            title={group.group_name} 
            onEdit={() => handleEditGroup(group.email, index)}
          >
            <ItemGroup
              id={group.leader_id}
              onDelete={() => handleExitGroup(group.leader_id)}
              subTitle={`Você(${authData?.email === group.email ? "Admin" : "Membro"})`}
              phone={group.phone}
            />

            <ScrollView
              style={{ maxHeight: 200 }}
              nestedScrollEnabled 
            >
              {group.users.map((user) => (
                <ItemGroup
                  key={user.email}
                  id={user.email}
                  onDelete={() => handleExitGroup(group.leader_id)}
                  subTitle={`Membro: ${user.email}`}
                  phone={user.phone}
                />
              ))}
            </ScrollView>
          </GroupCard>
        ))}
      </Container>

      <EditFieldModal
        value={editName}
        setValue={(text) => setEditName(text)}
        field="nome do grupo"
        onClose={() => setModalVisible(false)}
        onSubmit={handleSaveGroup} 
        visible={modalVisible}
      />
    </DefaultContainer>
  );
}