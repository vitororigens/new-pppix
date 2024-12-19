import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemContact } from "../../components/ItemContact";
import { useAxios } from "../../hooks/useAxios";
import { useContacts } from "../../hooks/useContacts";
import { Container, Content } from "./styles";
import { Toast } from "react-native-toast-notifications";
import { PickerSelect } from "../../components/PickerSelect";
import { Loader } from "../../components/Loader";

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
  const [select, setSelect] = useState<string>("valid");

  const bottomSheetRef = useRef<any>(null);

  const search = useCallback(
    (text: string) => {
      setSearchQuery(text.toLowerCase());

      const filteredContacts = allContacts.filter((contact) => {
        const matchesName = contact.name.toLowerCase().includes(text.toLowerCase());
        const matchesPhone = contact.phone.includes(text);


        const isValid = validContact.some((c) => c.phone === contact.phone);
        const isNotValid = !isValid;

        const matchesValidSelection =
          select === "notValid" ? isNotValid : select === "valid" ? isValid : false;

        return (matchesName || matchesPhone) && matchesValidSelection;
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

          const validContacts = allContacts.filter((contact) =>
            validNumbers.some((v: Contact) => v.phone === contact.phone)
          );

          setSelect("valid");
          setGroupContact(group);
          setValidContact(validNumbers);
          setContacts(validContacts);
        })
        .catch(() => {
          Toast.show("Erro ao carregar dados do grupo.", { type: "danger" });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [allContacts, api]);

  console.log(groupContact)

  function handleChangeContact(number: string) {
    api
      .post("group/remove", { phone: number })
      .then(() => {
        if (groupContact.some((groupNumber) => groupNumber.phone === number)) {
          console.log("remover");

          const newGroupContactArray = groupContact.filter(
            (groupContact) => groupContact.phone !== number
          );

          setGroupContact(newGroupContactArray);

          Toast.show("Usuário removido com sucesso.", {
            placement: "top",
            duration: 3000,
            type: "danger",
          });
        } else {
          console.log("adicionar");

          setGroupContact((prevGroupContact) => [
            ...prevGroupContact,
            { phone: number },
          ]);

          Toast.show("Usuário adicionado com sucesso.", {
            placement: "top",
            duration: 3000,
            type: "success",
          });
        }
      })
      .catch(() => {
        Toast.show("Erro ao atualizar o grupo.", {
          placement: "top",
          duration: 3000,
          type: "danger",
        });
      });
  }




  const handleSelectChange = (value: string) => {
    setSelect(value);
    setSearchQuery("");
    search("");
  };

  function handleSendSmsInvite(number: string) {
    api.post('sms/invite', { number })
      .then(() => {
        Toast.show('Convite enviado com sucesso', {
          placement: "top",
          duration: 3000,
          type: "success"
        });
      })
      .catch(() => {
        Toast.show('Falha no envio do convite', {
          placement: "top",
          duration: 3000,
          type: "danger"
        });
      })
  }

  return (
    <DefaultContainer title="Criar grupo" showMenu showButtonBack>
      <Container>
        <PickerSelect
          items={[
            { label: "Contatos Válidos", value: "valid" },
            { label: "Contatos Não Válidos", value: "notValid" }
          ]}
          onValueChange={handleSelectChange}
          selectedValue={select}
          type="PRIMARY"
        />

        <Input
          placeholder="Pesquisar"
          value={searchQuery}
          onChangeText={search}
        />

        <Content>
          {loading ? (
            <Loader/>
          ) : (
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id.toString()} 
              renderItem={({ item }) => (
                <ItemContact
                  key={item.id} 
                  name={item.name}
                  phone={item.phone}
                  isToggled={groupContact.some((g) => g.phone === item.phone)}
                  onToggle={
                    select === "valid" ? () => handleChangeContact(item.phone) : undefined
                  }
                  buttonSend={
                    select !== "valid" ? () => handleSendSmsInvite(item.phone) : undefined
                  }
                />
              )}
            />
          )}
        </Content>
      </Container>
    </DefaultContainer>
  );
}
