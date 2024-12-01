import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemContact } from "../../components/ItemContact";
import { useAxios } from "../../hooks/useAxios";
import { useContacts } from "../../hooks/useContacts";
import { Container, Content } from "./styles";
import * as ContactsExpo from "expo-contacts";
import { Toast } from "react-native-toast-notifications";

interface ExtendedContact extends ContactsExpo.Contact {
  phoneClean: string;
  phone: string;
}

export function CreateGroup() {
  const { allContacts, statusServiceContacts } = useContacts();
  const { api } = useAxios();

  const { width, height } = Dimensions.get("screen");
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ExtendedContact[]>([]);
  const [validContact, setValidContact] = useState<{ phone: string }[]>([]);
  const [groupContact, setGroupContact] = useState<{ phone: string }[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const [select, setSelect] = useState<string | undefined>("valid");

  const bottomSheetRef = useRef<any>(null);

  // Função para buscar contatos
  const search = (text: string) => {
    if (!Array.isArray(allContacts)) return;

    const filteredContacts = allContacts.filter((contact) => {
      const name = contact.name?.toLowerCase() || "";
      const phone = contact.phoneNumbers?.[0]?.number?.toLowerCase() || "";
      const phoneClean = phone.replace(/\s/g, "").replace(/\D/g, "");
      return (
        (
          select === "notValid" ||
          (select === "valid" &&
            validContact.some((c) => c.phone.includes(phoneClean)))
        ) &&
        (text.length === 0 ||
          name.includes(text.toLowerCase()) ||
          phone.includes(text.toLowerCase()))
      );
    });

    const extendedFilteredContacts: ExtendedContact[] = filteredContacts.map(
      (contact) => {
        const { phoneNumbers, ...rest } = contact;
        const phoneClean =
          phoneNumbers?.[0]?.number?.replace(/\s/g, "").replace(/\D/g, "") || "";
        const phone = phoneNumbers?.[0]?.number || "";
        return { ...rest, phoneClean, phone };
      }
    );

    setContacts(extendedFilteredContacts);
  };

  // Enviar convite por SMS
  function handleSendSmsInvite(number: string) {
    api
      .post("sms/invite", { number })
      .then(() => {
        Toast.show({
          title: "Convite enviado com sucesso!",
          placement: "top",
          duration: 3000,
          bgColor: "green.500",
        });
      })
      .catch(() => {
        Toast.show({
          title: "Falha no envio do convite.",
          placement: "top",
          duration: 3000,
          bgColor: "red.500",
        });
      });
  }

  // Atualizar contatos ao carregar
  useEffect(() => {
    if (Array.isArray(allContacts) && allContacts.length > 0) {
      api
        .post("group/users")
        .then((response) => {
          const extendedContacts = allContacts.map((contact) => {
            const { phoneNumbers, ...rest } = contact;
            const phoneClean =
              phoneNumbers?.[0]?.number?.replace(/\s/g, "").replace(/\D/g, "") ||
              "";
            const phone = phoneNumbers?.[0]?.number || "";
            return { ...rest, phoneClean, phone };
          });

          setContacts(extendedContacts);
          setGroupContact(response.data.group || []);
          setValidContact(response.data.numbers || []);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [allContacts]);

  const handleChangeContact = (number: string, numberClean: string) => {
    api
      .post("group/remove", { phone: number })
      .then(() => {
        const isMember = groupContact.some((g) =>
          numberClean.includes(g.phone)
        );

        if (isMember) {
          setGroupContact((prev) =>
            prev.filter((g) => !numberClean.includes(g.phone))
          );
          Toast.show({
            title: "Usuário removido com sucesso.",
            placement: "top",
            duration: 3000,
            bgColor: "red.500",
          });
        } else {
          setGroupContact((prev) => [...prev, { phone: numberClean }]);
          Toast.show({
            title: "Usuário adicionado com sucesso.",
            placement: "top",
            duration: 3000,
            bgColor: "green.500",
          });
        }
      });
  };

  return (
    <DefaultContainer title="Criar grupo" showMenu showButtonBack>
      <Container>
        <Input placeholder="Pesquisar" showSearch onChangeText={search} />
        <Content>
          {contacts.map((contact) => (
            <ItemContact
              key={contact.id}
              name={contact.name}
              phone={contact.phone}
              isToggled={groupContact.some((g) =>
                contact.phoneClean.includes(g.phone)
              )}
              onToggle={() =>
                handleChangeContact(contact.phone, contact.phoneClean)
              }
            />
          ))}
        </Content>
        <Button title="Criar grupo" onPress={() => console.log("Criar grupo")} />
      </Container>
    </DefaultContainer>
  );
}
