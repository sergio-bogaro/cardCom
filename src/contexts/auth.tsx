import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

const userDataType = {
  token_access: '',
  nome: '',
  email: '',
  id: ''
};

interface userProviderProps {
  children: ReactNode;
}

interface userType {
  userData: typeof userDataType;
  setUserData: any;
  transactionClient: any;
}

export const UserContext = createContext({} as userType);

export function UserProvider({ children }: userProviderProps) {
  const baseURL = 'https://api-capp.worktabsystems.com.br/api';
  const [userData, setUserData] = useState<typeof userDataType>(userDataType);

  useEffect(() => {
    const data = localStorage.getItem('userDataCAP');
    if (data) {
      const dataTransform = JSON.parse(data);
      setUserData(dataTransform);
    }
  }, []);

  const transactionClient = axios.create({
    baseURL: baseURL,
    // timeout: 5000,
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
      // 'Content-type': 'application/json',
      Authorization: 'Bearer ' + userData.token_access,
      Accept: 'application/json'
    }
  });

  return <UserContext.Provider value={{ userData, setUserData, transactionClient }}>{children}</UserContext.Provider>;
}
