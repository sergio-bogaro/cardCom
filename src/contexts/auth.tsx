import axios from 'axios';
import router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface userDataType {
  token_access: '',
  nome: '',
  email: '',
  id: ''
};

interface userProviderProps {
  children: ReactNode;
}

interface userType {
  userData: userDataType | undefined;
  currentPageName: string;
  setCurrentPageName: any;
  setUserData: any;
  transactionClient: any;
}

export const UserContext = createContext({} as userType);

export function UserProvider({ children }: userProviderProps) {
  const [userData, setUserData] = useState<userDataType>();
  const [currentPageName, setCurrentPageName] = useState("")

  useEffect(() => {
    const data = localStorage.getItem('userDataCAP');

    if (data) {
      const dataTransform = JSON.parse(data);
      setUserData(dataTransform);
    } else router.push('/login');
  }, []);

  const baseURL = 'https://api-capp.worktabsystems.com.br/api';
  const transactionClient = axios.create({
    baseURL: baseURL,
    // timeout: 5000,
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
      // 'Content-type': 'application/json',
      Authorization: 'Bearer ' + userData?.token_access,
      Accept: 'application/json'
    }
  });

  return <UserContext.Provider value={{ userData, setUserData, transactionClient, currentPageName, setCurrentPageName }}>{children}</UserContext.Provider>;
}
