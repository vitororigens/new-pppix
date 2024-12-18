import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemContact } from "../../components/ItemContact";
import { useAxios } from "../../hooks/useAxios";
import { useContacts } from "../../hooks/useContacts";
import { Container, Content } from "./styles";
import { Toast } from "react-native-toast-notifications";
import { PickerSelect } from "../../components/PickerSelect";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export function CreateGroup() {
  const { allContacts } = useContacts();
  const { api } = useAxios();

  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [validContact, setValidContact] = useState<{ phone: string }[]>([]);
  const [groupContact, setGroupContact] = useState<{ phone: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [select, setSelect] = useState<string>("valid"); // "valid" or "notValid"

  const bottomSheetRef = useRef<any>(null);

  // Função de busca com base no nome, telefone e tipo de contato (válido ou não válido)
  const search = useCallback(
    (text: string) => {
      setSearchQuery(text.toLowerCase());

      const filteredContacts = allContacts.filter((contact) => {
        const matchesName = contact.name.toLowerCase().includes(text.toLowerCase());
        const matchesPhone = contact.phone.includes(text);
        const isValid =
          select === "notValid" ||
          (select === "valid" && validContact.some((c) => c.phone === contact.phone));
        return (matchesName || matchesPhone) && isValid;
      });

      setContacts(filteredContacts);
    },
    [allContacts, validContact, select]
  );

  useEffect(() => {
    if (Array.isArray(allContacts) && allContacts.length > 0) {
      setLoading(true);
      api
        .post("group/users")
        .then((response: any) => {
          const group = response.data.group || [];
          const validNumbers = response.data.numbers || [];
          setGroupContact(group);
          setValidContact(validNumbers);
          setContacts(allContacts);
        })
        .catch(() => {
          Toast.show("Erro ao carregar dados do grupo.", { type: "danger" });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [allContacts, api]);

  const handleChangeContact = (phone: string) => {
    const isSelected = groupContact.some((g) => g.phone === phone);
    if (isSelected) {
      setGroupContact(groupContact.filter((g) => g.phone !== phone));
    } else {
      setGroupContact([...groupContact, { phone }]);
    }
  };

  // Função para atualizar a seleção no PickerSelect
  const handleSelectChange = (value: string) => {
    setSelect(value);
    setSearchQuery(""); // Limpar a pesquisa quando a seleção mudar
    search(""); // Atualizar a lista de contatos com base no novo tipo de seleção
  };

  return (
    <DefaultContainer title="Criar grupo" showMenu showButtonBack>
      <Container>
        {/* PickerSelect para escolher entre contatos válidos ou não válidos */}
        <PickerSelect
          items={[
            { label: "Contatos Válidos", value: "valid" },
            { label: "Contatos Não Válidos", value: "notValid" }
          ]}
          onValueChange={handleSelectChange}
          selectedValue={select}
          type="PRIMARY"
        />

        {/* Campo de pesquisa */}
        <Input
          placeholder="Pesquisar"
          value={searchQuery}
          onChangeText={search}
        />

        <Content>
          {loading ? (
            <Button title="Carregando..." disabled />
          ) : (
            contacts.map((contact) => (
              <ItemContact
                key={contact.id}
                name={contact.name}
                phone={contact.phone}
                isToggled={groupContact.some((g) => g.phone === contact.phone)}
                onToggle={() => handleChangeContact(contact.phone)}
              />
            ))
          )}
        </Content>

        {/* Botão para criar grupo */}
        <Button title="Criar grupo" onPress={() => console.log("Criar grupo", groupContact)} />
      </Container>
    </DefaultContainer>
  );
}
