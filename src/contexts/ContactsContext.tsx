import React, { createContext, useEffect, useState } from "react";
import * as ContactsExpo from "expo-contacts";

interface ContactsProviderProps {
  children: React.ReactNode;
}

export interface ContactsContextDataProps {
  allContacts: { id: string; name: string; phone: string }[];
  statusServiceContacts: string;
  loaded: boolean;
}

export const ContactsContext = createContext<ContactsContextDataProps>(
  {} as ContactsContextDataProps
);

function ContactsProvider({ children }: ContactsProviderProps) {
  const [allContacts, setAllContacts] = useState<
    { id: string; name: string; phone: string }[]
  >([]);
  const [statusServiceContacts, setStatusServiceContacts] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      const { status } = await ContactsExpo.requestPermissionsAsync();
  
      if (status === "granted") {
        setStatusServiceContacts("granted");
  
        const { data } = await ContactsExpo.getContactsAsync({
          fields: [ContactsExpo.Fields.PhoneNumbers],
        });
  
        if (data.length > 0) {
          const formattedContacts = data
            .filter((contact): contact is ContactsExpo.Contact & {
              phoneNumbers: ContactsExpo.PhoneNumber[];
            } =>
              Array.isArray(contact.phoneNumbers) &&
              contact.phoneNumbers.length > 0
            )
            .map((contact) => {
              const phone = contact.phoneNumbers[0]?.number?.replace(/\D/g, ""); 
              if (!contact.id || !phone) {
                return null;
              }
              return {
                id: contact.id,
                name: contact.name || "Sem Nome",
                phone,
              };
            })
            .filter((contact): contact is { id: string; name: string; phone: string } => !!contact); 
  
          setAllContacts(formattedContacts);
          setLoaded(true);
        } else {
          setLoaded(true);
          setStatusServiceContacts("notFound");
        }
      } else {
        setStatusServiceContacts("denied");
      }
    };
  
    getContacts();
  }, []);
  
  
  
  return (
    <ContactsContext.Provider
      value={{ allContacts, statusServiceContacts, loaded }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsProvider;
