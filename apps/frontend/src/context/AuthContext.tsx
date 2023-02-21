import apiClient from "@/utils/apiClient";
import { createContext, ReactNode, useCallback, useState } from "react";
import { IUser } from "./type/authContext";

interface IAuthContext {
  user: IUser;
  updateUser: (newUser: IUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const updateUser = useCallback((newUser: IUser) => {
    setUser(newUser);
  }, []);
  const signOut = useCallback(() => {
    try {
      const response = apiClient.post("/auth/sign-out");
      console.log(response);
      setUser({} as IUser);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, updateUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
