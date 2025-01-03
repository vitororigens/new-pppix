import { useState } from "react";
import { DefaultContainer } from "../../components/DefaultContainer";
import { GroupCard } from "../../components/GroupCard";
import { Input } from "../../components/Input";
import { ItemGroup } from "../../components/ItemGroup";
import { Toast } from "react-native-toast-notifications";
import { EditFieldModal } from "../../components/EditFieldModal";
import { ScrollView } from "react-native";
import { Container } from "./styles";
import { useGroups } from "../../contexts/useGroups";


export function Groups() {
  const { groups, loading, handleSaveGroup, handleExitGroup } = useGroups(); // Usando o contexto
  const [editName, setEditName] = useState("");
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const filteredGroups = groups.filter(
    (group) =>
      group.group_name?.toLowerCase().includes(search.toLowerCase()) ||
      (!group.group_name && search === "")
  );

  const handleEditGroup = (groupName: string) => {
    setEditName(groupName);
    setModalVisible(true);
  };

  return (
    <DefaultContainer title="Grupos" showMenu showButtonBack>
      <Container>
        <Input
          placeholder="Buscar grupos"
          value={search}
          onChangeText={setSearch}
          showSearch
        />

        {filteredGroups.map((group) => (
          <GroupCard
            key={group.leader_id}
            title={group.group_name}
            onEdit={() => handleEditGroup(group.group_name)}
          >
            <ItemGroup
              id={group.leader_id}
              onDelete={() => handleExitGroup(group.leader_id)}
              subTitle={`Você(${group.email === 'user@example.com' ? 'Admin' : 'Membro'})`} // Altere conforme sua lógica de autenticação
              phone={group.phone}
            />
            <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
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
        setValue={setEditName}
        field="nome do grupo"
        onClose={() => setModalVisible(false)}
        onSubmit={() => {
          handleSaveGroup(editName);
          setModalVisible(false);
          Toast.show("Nome alterado com sucesso!", {
            placement: "top",
            duration: 3000,
            type: "success",
          });
        }}
        visible={modalVisible}
      />
    </DefaultContainer>
  );
}
