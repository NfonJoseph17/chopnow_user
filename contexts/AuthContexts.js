import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('currentUser', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const getAndSetStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) setUser(JSON.parse(storedUser));
      console.log('Stored user: ', storedUser);
    };

    getAndSetStoredUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;