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
}

export const UserContext = createContext({} as typeof userDataType);

export function UserProvider({ children }: userProviderProps) {
  const [userData, setUserData] = useState(userDataType);

  useEffect(() => {
    const data = localStorage.getItem('userDataCAP');
    if (data) {
      const dataTransform = JSON.parse(data);
      setUserData(dataTransform);
    }
  }, []);

  return <UserContext.Provider value={{ ...userData }}>{children}</UserContext.Provider>;
}
