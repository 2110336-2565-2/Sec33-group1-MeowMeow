import { createContext, ReactNode, useCallback, useState } from "react";
import { IUser } from "./type/authContext";
interface IAuthContext {
  user: IUser;
  updateUser: (newUser: IUser) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const updateUser = useCallback((newUser: IUser) => {
    setUser(newUser);
  }, []);
  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
