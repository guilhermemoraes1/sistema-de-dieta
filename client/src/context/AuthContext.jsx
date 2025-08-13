import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedAuth) {
      setIsAuth(true);
    } else {
      fetch('http://localhost:5000/is-authenticated', {
        credentials: 'include', 
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            localStorage.setItem('isAuthenticated', 'true');
            setIsAuth(true);
          }
        })
        .catch((err) => {
          console.error('Erro ao verificar autenticação:', err);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
