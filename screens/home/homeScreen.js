import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const todaysSpecialList = [
  {
    id: "t1",
    foodImage: require("../../assets/images/food/food11.png"),
    foodName: "Chicken italiano cheezy periperi pizza",
    amount: 14.99,
    isVeg: false,
  },
  {
    id: "t2",
    foodImage: require("../../assets/images/food/food14.png"),
    foodName: "Paneer Khurchan",
    amount: 19.99,
    isVeg: true,
  },
];

const bannersList = [
  {
    id: "1",
    bannerImage: require("../../assets/images/food/food1.png"),
  },
  {
    id: "2",
    bannerImage: require("../../assets/images/food/food2.png"),
  },
];

const nearByRestaurantsList = [
  {
    id: "1",
    restaurantName: "Legacy Restaurant",
    ratedPeopleCount: 8,
    restaurantAddress: "ENS Street, Bambili",
    rating: 4.3,
  },
  {
    id: "2",
    restaurantName: "Las Vegas complext Restaurant",
    ratedPeopleCount: 18,
    restaurantAddress: "3-Conners, Bambili",
    rating: 4.0,
  },
  {
    id: "3",
    restaurantName: "Pluto Restaurant",
    ratedPeopleCount: 10,
    restaurantAddress: "ENS Street, Bambili",
    rating: 3.5,
  },
  {
    id: "4",
    restaurantName: "Miyanui Lebanon Plaza",
    ratedPeopleCount: 15,
    restaurantAddress: "3-Conners, Bambili",
    rating: 3.0,
  },
  {
    id: "5",
    restaurantName: "Crush in Black Rose Restaurant",
    ratedPeopleCount: 8,
    restaurantAddress: "3-Conners, Bambili",
    rating: 2.0,
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            {searchInfo()}
            {banners()}
            {nearByRestaurantsInfo()}
           
          </>
        }
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0 }}
        showsVerticalScrollIndicator={false}
      />
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
                {item.restaurantName}
              </Text>
              <Text style={{ ...Fonts.grayColor12Medium }}>
                {item.ratedPeopleCount} People Rated
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
            {item.restaurantAddress}
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
          data={nearByRestaurantsList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  function banners() {
    const renderItem = ({ item }) => (
      <Image source={item.bannerImage} style={styles.bannerImageStyle} />
    );
    return (
      <View>
        <FlatList
          data={bannersList}
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
});

export default HomeScreen;
