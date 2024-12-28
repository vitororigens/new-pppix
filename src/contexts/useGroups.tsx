import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAxios } from '../hooks/useAxios';


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

interface GroupContextProps {
  groups: GroupData[];
  loading: boolean;
  updateGroups: () => void;
  handleSaveGroup: (name: string) => void;
  handleExitGroup: (leader_id: string) => void;
}

const GroupContext = createContext<GroupContextProps | undefined>(undefined);
interface GroupProviderInterface {
    children: React.ReactNode;
}

export const GroupProvider = ({ children }: GroupProviderInterface) => {
  const { api } = useAxios();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [loading, setLoading] = useState(true);

  const updateGroups = async () => {
    try {
      const response = await api.get('/group');
      setGroups(response.data.groups);
    } catch (error) {
      console.error('Erro ao obter grupos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGroup = async (name: string) => {
    try {
      await api.post("/group/update", { name });
      await updateGroups();
    } catch (error) {
      console.error('Erro ao salvar grupo:', error);
    }
  };

  const handleExitGroup = async (leader_id: string) => {
    try {
      await api.post('/group/exit', { leader_id });
      updateGroups();
    } catch (error) {
      console.error('Erro ao sair do grupo:', error);
    }
  };

  useEffect(() => {
    updateGroups();
  }, []);

  return (
    <GroupContext.Provider
      value={{ groups, loading, updateGroups, handleSaveGroup, handleExitGroup }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = (): GroupContextProps => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroups must be used within a GroupProvider');
  }
  return context;
};
