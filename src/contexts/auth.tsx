import { createContext, ReactNode, useEffect, useState } from 'react';

const userDataType = {
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
    const a = localStorage.getItem('userDataCAP');
    if (a) {
      const b = JSON.parse(a);
      setUserData(b);
    }
  }, []);

  return <UserContext.Provider value={{ ...userData }}>{children}</UserContext.Provider>;
}
