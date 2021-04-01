import React, { createContext, useContext, useEffect, useState } from 'react';
import { refreshToken } from '../services/auth.service';

const tokenContext = createContext();

const useToken = () => {
  const [accessToken, setAccessToken] = useState(undefined);

  const getAccessToken = () => accessToken;

  useEffect(() => {
    refreshToken().then(({ accessToken }) => setAccessToken(accessToken));
  }, []);

  return {
    getAccessToken,
    setAccessToken,
  };
};

export default function TokenProvider({ children }) {
  const tokenStorage = useToken();
  return (
    <tokenContext.Provider value={tokenStorage}>
      {children}
    </tokenContext.Provider>
  );
}

export const useTokenStorage = () => useContext(tokenContext);
