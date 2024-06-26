
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
import Personals from "./screens/auth/personals";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContexts";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "./App";


const Stack = createStackNavigator();

const AppRoutes = () => {
  const [initializing, setInitializing] = useState(true);

  const user = useContext(AuthContext)?.user;
  const setUser = useContext(AuthContext)?.setUser;

  const handleAuthUserExists = async (authUser) => {
    try {
      const getCurrentUser = httpsCallable(functions, 'getCurrentUser');
      const response = await getCurrentUser();
      // We are almost sure that by the time we get the user by email, setUser function will be initialized (non null)
      if (setUser) setUser({...response.data.user, createdAt:new Date(response.data.user.createdAt)});
    } catch (error) {
      if (error.code == 'auth/user-not-found') auth.signOut(); //signs out if the user doesn't exist in the db
      console.log('Error while getting current user: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        handleAuthUserExists(authUser);
      } else {
        if (setUser) setUser(null); // Signed out
        await AsyncStorage.removeItem('currentUser');
      }

      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {
        user ? null
          :
          <>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
            <Stack.Screen name="Signin" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Personals" component={Personals} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </>
      }
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
  )
};


export default AppRoutes;