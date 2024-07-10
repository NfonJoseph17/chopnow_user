import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('User Context: ', user)
    if (user) {
      AsyncStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('currentUser');
    }
  }, [user]);

  useEffect(() => {
    const getAndSetStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) setUser(JSON.parse(storedUser));
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