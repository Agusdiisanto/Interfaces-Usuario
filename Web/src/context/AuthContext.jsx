import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../services/Api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      navigate('/');
    } else {
      Api.loggedUser()
        .then((response) => {
          setLoggedUser(response.data);
        })
        .catch((error) => {
          navigate('/');
        });
    }
  }, [navigate]);

  const logout = () => {
    Api.clearToken();
    navigate('/');
  };

  const authData = {
    loggedUser,
    setLoggedUser,
    logout
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
