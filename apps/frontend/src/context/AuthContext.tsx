import apiClient from "@/utils/apiClient";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IProfileResponse, IUser, Roles_Types } from "./type/authContext";
interface IAuthContext {
  user: IUser | undefined;
  updateUser: (newUser: IUser | undefined) => void;
  refreshProfile: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
  roleAllowed?: Roles_Types[];
}

const AuthProvider = ({
  children,
  roleAllowed = ["USER"],
}: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | undefined>({} as IUser);
  const [isUpdate, setUpdate] = useState<boolean>(false);
  const updateUser = useCallback((newUser: IUser | undefined) => {
    setUser(newUser);
  }, []);
  const refreshProfile = useCallback(() => {
    setUpdate((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get<IProfileResponse>(
          "/users/profile"
        );

        const { roles } = data;
        setUser(data);

        const isRoleIncluded = roles.reduce((prev, curr) => {
          if (prev) {
            return prev;
          }
          return !!roleAllowed.includes(curr);
        }, false);

        if (!isRoleIncluded) {
          window.location.href = "/not-allowed";
        }
      } catch (err) {
        window.location.href = "";
      }
    };
    fetchProfile();
  }, [isUpdate]);

  return (
    <AuthContext.Provider value={{ user, updateUser, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
