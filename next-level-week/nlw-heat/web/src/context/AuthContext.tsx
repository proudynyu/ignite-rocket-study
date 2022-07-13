import { useContext, createContext, FC, useState, useEffect } from "react";
import { api } from "../services/api";

interface User {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface AuthContextProps {
  user: User | null;
  signInUrl: string;
  signOut: () => void
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    login: string;
    name: string;
  };
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=3f7cb9831f84656140ad`;

  const signIn = async (code: string) => {
    const { data: authReponse } = await api.post<AuthResponse>(
      "/authenticate",
      {
        code,
      }
    );

    const { token, user } = authReponse;

    localStorage.setItem("@dowhile:token", token);
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  };

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>("profile").then((resp) => setUser(resp.data));
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, code] = url.split("?code=");
      const replacedUrl = urlWithoutCode.replace("/signin/callback", "");
      window.history.pushState({}, "", replacedUrl);

      signIn(code);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  const hasContext = Boolean(Object.entries(context).length);

  if (hasContext) {
    throw new Error("userAuthContext must be used inside the AuthContext");
  }

  return context;
};
