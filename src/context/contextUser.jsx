import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ perfil: "admin" }); //useState(() => JSON.parse(window.sessionStorage.getItem('currentUser')))
  return (
    <authContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </authContext.Provider>
  );
};
