import React, { useState, createContext, useEffect, useContext } from 'react';
import { setAuthorizationHeader, setInterceptor } from '../api';
import { clear, writeItem, readItem } from '../utils/localStorage';

const AuthContext = createContext({
  signedIn: false,
  signIn: () => {},
  signOut: () => {},
});

export const AuthContextProvider = ({ children, ...props }) => {
  const [localToken, setLocalToken] = useState(null);

  const setApiToken = (token) => setAuthorizationHeader(token);

  useEffect(() => {
    (async () => {
      setInterceptor(signOut);
      const storedToken = await readItem('token');

      if (storedToken) {
        setLocalToken(storedToken);
        setApiToken(storedToken);
      }
    })();
  }, []);

  const signIn = async (token) => {
    setApiToken(token);
    setLocalToken(token);
    await writeItem('token', token);
  };

  const signOut = async () => {
    setLocalToken(null);
    clear();
  };

  return (
    <AuthContext.Provider
      value={{
        signedIn: !!localToken,
        signIn,
        signOut,
        localToken,
      }}
      {...props}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
