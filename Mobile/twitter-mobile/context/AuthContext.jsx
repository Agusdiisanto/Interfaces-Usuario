import React, { createContext, useState} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [loggedUser, setLoggedUser] = useState(null)
   
  const data = { loggedUser, setLoggedUser};
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;