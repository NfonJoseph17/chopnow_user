import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../App";

const { width } = Dimensions.get("window");


const HomeScreen = ({ navigation }) => {
  const [banners, setBanners] = useState([]);
  const [nearbyRestaus, setNearbyRestaus] = useState([]);

  const getAndSetBanners = async () => {
    try {
      const getBanners = httpsCallable(functions, 'getBanners');
      const {banners} = (await getBanners()).data;
      setBanners(banners);
    } catch (error) {
      console.log('An error occured while getting restaus: ', error);
    };
  };

  const getAndSetRestaus = async () => {
    try {
      const getRestausList = httpsCallable(functions, 'getRestausList');
      const {restaus} = (await getRestausList({filter:'recommended'})).data;
      setNearbyRestaus(restaus);
    } catch (error) {
      console.log('An error occured while getting restaus: ', error);
    };
  };

  useEffect(() => {
    getAndSetBanners();
    getAndSetRestaus()
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            {searchInfo()}
            {bannersInfos()}
            {nearByRestaurantsInfo()}
           
          </>
        }
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0 }}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={{position:'absolute', bottom:84, right:16, zIndex:50}}>
        <Pressable onPress={() => navigation.navigate("AIAssistant")} style={styles.aiFloatingButton}>
          <FontAwesome5 name="robot" color={'white'} size={24}/>
        </Pressable>
      </View>
    </View>
  );

  function nearByRestaurantsInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("RestaurantDetail", { id: item.id })}
        style={styles.nearByRestaurantsWrapStyle}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={styles.nearByRestaurantsIconWrapStyle}>
              <Image
                source={require("../../assets/images/icons/restaurant_icon.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  flex: 1,
                  resizeMode: "contain",
                }}
              />
            </View>
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.blackColor12SemiBold }}>
                {item.name}
              </Text>
              <Text style={{ ...Fonts.grayColor12Medium }}>
                {item.ratingsCount} People Rated
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginRight: Sizes.fixPadding - 5.0,
                ...Fonts.primaryColor12SemiBold,
              }}
            >
              {item.rating.toFixed(1)}
            </Text>
            <MaterialIcons name="star" color={Colors.primaryColor} size={14} />
          </View>
        </View>
        <View
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="location-on"
            color={Colors.primaryColor}
            size={16}
          />
          <Text
            style={{
              marginLeft: Sizes.fixPadding - 5.0,
              ...Fonts.grayColor12Medium,
            }}
          >
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View>
        <View
          style={{
            marginBottom: Sizes.fixPadding,
            marginTop: Sizes.fixPadding * 2.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            Restaurants Near You
          </Text>
          <Text
            onPress={() => navigation.push("RestaurantsList")}
            style={{ ...Fonts.primaryColor12SemiBold }}
          >
            see all
          </Text>
        </View>
        <FlatList
          listKey="nearByRestaurants"
          data={nearbyRestaus}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  function bannersInfos() {
    const renderItem = ({ item }) => (
      <Image source={item.image.uri} style={styles.bannerImageStyle} />
    );
    return (
      <View>
        <FlatList
          data={banners}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  function searchInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("Search")}
        style={styles.searchInfoWrapStyle}
      >
        <MaterialIcons name="search" color={Colors.blackColor} size={18} />
        <Text
          style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor14Medium }}
        >
          Search for restaurant,food...
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  searchInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding + 5.0,
    elevation: 2.0,
  },
  bannerImageStyle: {
    width: 200,
    height: 120,
    resizeMode: "stretch",
    borderRadius: Sizes.fixPadding,
    marginRight: Sizes.fixPadding * 2.0,
  },
  offerBannerWrapStyle: {
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    marginRight: Sizes.fixPadding * 2.0,
    height: width - 270.0,
    width: width - 140.0,
  },
  offerBannerImageStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  vegOrnonVegIconOuterStyle: {
    width: 12.0,
    height: 12.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  vegOrnonVegIconInnerStyle: {
    width: 6.5,
    height: 6.5,
    borderRadius: 3.5,
  },
  todaysSpecialFoodImageStyle: {
    height: 120,
    width: "100%",
    flex: 1,
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
  },
  todaysSpecialFoodInfoWrapStyle: {
    padding: Sizes.fixPadding,
    height: 55.0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nearByRestaurantsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  nearByRestaurantsIconWrapStyle: {
    width: 35.0,
    height: 35.0,
    backgroundColor: "#E6E6E6",
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding - 6.0,
  },
  aiFloatingButton:{
    padding:6,
    paddingBottom:8,
    height:52, width:52,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.primaryColor
  }
});

export default HomeScreen;
