import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { connectAuthEmulator, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AppRoutes from './AppRoutes';
import AuthContextProvider from './contexts/AuthContexts';



ExpoSplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();


const firebaseConfig = {
  apiKey: "AIzaSyDOcbfzkzZa_iYgwxAuAdYGtbKGd8RZYTw",
  authDomain: "chopnow-e9949.firebaseapp.com",
  projectId: "chopnow-e9949",
  storageBucket: "chopnow-e9949.appspot.com",
  messagingSenderId: "951232422686",
  appId: "1:951232422686:web:8f4864c4ee726aab95df0f",
  measurementId: "G-7Y2WQHXVCP"
};

const origin = "192.168.243.174";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
connectAuthEmulator(auth, `http://${origin}:9099`);

const db = getFirestore(app);
connectFirestoreEmulator(db, origin, 8080);

const functions = getFunctions(app);
connectFunctionsEmulator(functions, origin, 5001);

const storage = getStorage(app);
connectStorageEmulator(storage, origin, 9199);

export { auth, db, functions, storage };




const App = () => {

  const [fontsLoaded] = useFonts({
    Montserrat_Light: require("./assets/fonts/Montserrat-Light.ttf"),
    Montserrat_Regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    Montserrat_Medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    Montserrat_SemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    Montserrat_Bold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <AuthContextProvider>
        <NavigationContainer>
          <AppRoutes/>
        </NavigationContainer>
      </AuthContextProvider>
    );
  }
}

export default App;