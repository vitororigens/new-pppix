import React, { createContext, useEffect, useState } from "react";
import * as ContactsExpo from "expo-contacts";

interface ContactsProviderProps {
  children: React.ReactNode;
}

export interface ContactsContextDataProps {
  allContacts: ContactsExpo.Contact[];
  statusServiceContacts: string;
  loaded: boolean;
}

export const ContactsContext = createContext<ContactsContextDataProps>(
  {} as ContactsContextDataProps
);

function ContactsProvider({ children }: ContactsProviderProps) {
  const [allContacts, setAllContacts] = useState<ContactsExpo.Contact[]>([]);
  const [statusServiceContacts, setStatusServiceContacts] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      const { status } = await ContactsExpo.requestPermissionsAsync();
      
      if (status === "granted") {
        setStatusServiceContacts("granted");
        
        const { data } = await ContactsExpo.getContactsAsync({
          fields: [
            ContactsExpo.Fields.Emails,
            ContactsExpo.Fields.PhoneNumbers,
          ],
        });
        if (data.length > 0) {
          data.map((contact:any) => {
            if (contact.phoneNumbers != undefined) {
              contact.phone = contact.phoneNumbers[0].number
              contact.phoneClean = contact.phoneNumbers[0].number.replace(/\s/g, '').replace(/\D/g, "")
            }
          })
          setLoaded(true);
          setAllContacts(data);
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
