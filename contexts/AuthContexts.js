import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      // AsyncStorage.removeItem('currentUser');
    }
  }, [user]);

  useEffect(() => {
    const getAndSetStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) setUser(JSON.parse(storedUser));
      setInitializing(false);
    };

    getAndSetStoredUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        initializing
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;