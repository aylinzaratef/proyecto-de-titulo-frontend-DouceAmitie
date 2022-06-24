import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ perfil: "trabajador", rut: "19772375-0" }); //useState(() => JSON.parse(window.sessionStorage.getItem('currentUser')))
  return (
    <authContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </authContext.Provider>
  );
};
