import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : null;
  });

  const [privateKeyEdDSA, setPrivateKeyEdDSA] = useState('');
  const [privateKeyECDH, setPrivateKeyECDH] = useState('');

  const storePrivateKeys = ({ eddsa, ecdh }) => {
    if (eddsa !== undefined) setPrivateKeyEdDSA(eddsa);
    if (ecdh !== undefined) setPrivateKeyECDH(ecdh);
  };

  const login = (data) => {
    setAuth(data);
    localStorage.setItem('auth', JSON.stringify(data));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    setPrivateKeyEdDSA('');
    setPrivateKeyECDH('');
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        privateKeyEdDSA,
        privateKeyECDH,
        storePrivateKeys,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
