import { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function loadToken() {
      const stored = await SecureStore.getItemAsync("token");
      if (stored) setToken(stored);
    }
    loadToken();
  }, []);

  async function login(newToken) {
    setToken(newToken);
    await SecureStore.setItemAsync("token", newToken);   
  }

  async function logout() {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}