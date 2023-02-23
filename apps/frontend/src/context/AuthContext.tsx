import apiClient from "@/utils/apiClient";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IProfileResponse, IUser } from "./type/authContext";
interface IAuthContext {
  user: IUser | undefined;
  updateUser: (newUser: IUser | undefined) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | undefined>({} as IUser);
  const updateUser = useCallback((newUser: IUser | undefined) => {
    setUser(newUser);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get<IProfileResponse>(
          "/users/profiles"
        );
        setUser(data);
      } catch (err) {
        console.log("err");
      }
    };
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
