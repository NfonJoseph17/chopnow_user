import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import SearchScreen from "./screens/search/searchScreen";
import ProductsScreen from "./screens/products/productsScreen";
import RestaurantsListScreen from "./screens/restaurantsList/restaurantsListScreen";
import RestaurantDetailScreen from "./screens/restaurantDetail/restaurantDetailScreen";
import FoodOfDifferentCategoriesScreen from "./screens/foodOfDifferentCategories/foodOfDifferentCategoriesScreen";
import OfferDetailScreen from "./screens/offerDetail/offerDetailScreen";
import SelectDeliveryAddressScreen from "./screens/selectDeliveryAddress/selectDeliveryAddressScreen";
import AddNewAddressScreen from "./screens/addNewAddress/addNewAddressScreen";
import SelectPaymentMethodScreen from "./screens/selectPaymentMethod/selectPaymentMethodScreen";
import OrderPlacedInfoScreen from "./screens/orderPlacedInfo/orderPlacedInfoScreen";
import OrderDetailScreen from "./screens/orderDetail/orderDetailScreen";
import TrackOrderScreen from "./screens/trackOrder/trackOrderScreen";
import MessageScreen from "./screens/message/messageScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import PaymentMethodsScreen from "./screens/paymentMethods/paymentMethodsScreen";
import AddNewPaymentMathodScreen from "./screens/addNewPaymentMethod/addNewPaymentMathodScreen";
import AddressScreen from "./screens/address/addressScreen";
import ShareAndEarnScreen from "./screens/shareAndEarn/shareAndEarnScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import FavoritesScreen from "./screens/favorites/favoritesScreen";
import SettingsScreen from "./screens/settings/settingsScreen";
import SplashScreen from "./screens/splashScreen";
import SigninScreen from "./screens/auth/signinScreen";
import SignupScreen from "./screens/auth/signupScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Personals from './screens/auth/personals';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { connectAuthEmulator, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


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

const origin = "192.168.248.174";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
connectAuthEmulator(auth, `http://${origin}:9099`);

const db = getFirestore(app);
connectFirestoreEmulator(db, origin, 8080);

const functions = getFunctions(app);
connectFunctionsEmulator(functions, origin, 5001);

const storage = getStorage(app);
connectStorageEmulator(storage, origin, 9199);

export { auth, db, functions, storage };


const Stack = createStackNavigator();

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
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Signin" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Personals" component={Personals}/>
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="RestaurantsList" component={RestaurantsListScreen} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
          <Stack.Screen name="FoodOfDifferentCategories" component={FoodOfDifferentCategoriesScreen} />
          <Stack.Screen name="OfferDetail" component={OfferDetailScreen} />
          <Stack.Screen name="SelectDeliveryAddress" component={SelectDeliveryAddressScreen} />
          <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
          <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethodScreen} />
          <Stack.Screen name="OrderPlaceInfo" component={OrderPlacedInfoScreen} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
          <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
          <Stack.Screen name="AddNewPaymentMethod" component={AddNewPaymentMathodScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="ShareAndEarn" component={ShareAndEarnScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;