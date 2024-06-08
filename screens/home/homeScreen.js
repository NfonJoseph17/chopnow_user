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

const foodCategoriesList = [
  {
    id: "1",
    category: "Fast Food",
    foodImage: require("../../assets/images/food/food3.png"),
  },
  {
    id: "2",
    category: "South Indian",
    foodImage: require("../../assets/images/food/food4.png"),
  },
  {
    id: "3",
    category: "Chinese",
    foodImage: require("../../assets/images/food/food5.png"),
  },
  {
    id: "4",
    category: "Diet Food",
    foodImage: require("../../assets/images/food/food6.png"),
  },
  {
    id: "5",
    category: "Italian",
    foodImage: require("../../assets/images/food/food7.png"),
  },
  {
    id: "6",
    category: "Sea Food",
    foodImage: require("../../assets/images/food/food8.png"),
  },
  {
    id: "7",
    category: "Ice Cream",
    foodImage: require("../../assets/images/food/food9.png"),
  },
  {
    id: "8",
    category: "Dessert",
    foodImage: require("../../assets/images/food/food10.png"),
  },
];

const offersBannersList = [
  {
    id: "o1",
    bannerImage: require("../../assets/images/offer_banner/Offer1.png"),
  },
  {
    id: "o2",
    bannerImage: require("../../assets/images/offer_banner/Offer2.png"),
  },
];

const nearByRestaurantsList = [
  {
    id: "1",
    restaurantName: "Marine Rise Restaurant",
    ratedPeopleCount: 198,
    restaurantAddress: "1124, Old Chruch Street, New york, USA",
    rating: 4.3,
  },
  {
    id: "2",
    restaurantName: "Sliver Leaf Restaurant",
    ratedPeopleCount: 170,
    restaurantAddress: "1124, Old Chruch Street, New york, USA",
    rating: 4.0,
  },
  {
    id: "3",
    restaurantName: "Johson Foods",
    ratedPeopleCount: 130,
    restaurantAddress: "1124, Old Chruch Street, New york, USA",
    rating: 3.5,
  },
  {
    id: "4",
    restaurantName: "Lepord Cafe",
    ratedPeopleCount: 100,
    restaurantAddress: "1124, Old Chruch Street, New york, USA",
    rating: 3.0,
  },
  {
    id: "5",
    restaurantName: "King Of Foods",
    ratedPeopleCount: 80,
    restaurantAddress: "1124, Old Chruch Street, New york, USA",
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
            {foodCategoriesInfo()}
            {offersInfo()}
            {nearByRestaurantsInfo()}
            {todaysSpecialInfo()}
          </>
        }
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  function todaysSpecialInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("OfferDetail", { item: item })}
        style={{
          backgroundColor: Colors.lightGrayColor,
          borderRadius: Sizes.fixPadding,
          marginBottom: Sizes.fixPadding + 5.0,
        }}
      >
        <Image
          source={item.foodImage}
          style={styles.todaysSpecialFoodImageStyle}
        />
        <View style={styles.todaysSpecialFoodInfoWrapStyle}>
          <Text
            numberOfLines={2}
            style={{ flex: 1, ...Fonts.blackColor13Medium }}
          >
            {item.foodName}
          </Text>
          <View
            style={{ flex: 0.5, alignItems: "flex-end", alignSelf: "center" }}
          >
            <View
              style={{
                borderColor: item.isVeg ? Colors.greenColor : Colors.redColor,
                ...styles.vegOrnonVegIconOuterStyle,
              }}
            >
              <View
                style={{
                  ...styles.vegOrnonVegIconInnerStyle,
                  backgroundColor: item.isVeg
                    ? Colors.greenColor
                    : Colors.redColor,
                }}
              />
            </View>
          </View>
        </View>
        <Text
          style={{
            position: "absolute",
            top: 5.0,
            right: 5.0,
            ...Fonts.whiteColor14Bold,
          }}
        >
          {item.amount.toFixed(2)}$
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.blackColor16SemiBold,
          }}
        >
          Today's Special
        </Text>
        <FlatList
          data={todaysSpecialList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    );
  }

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

  function offersInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("OfferDetail", { item: item })}
        style={styles.offerBannerWrapStyle}
      >
        <Image
          source={item.bannerImage}
          style={styles.offerBannerImageStyle}
        />
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...Fonts.blackColor16SemiBold }}>Offers For You</Text>
          <Text style={{ ...Fonts.primaryColor12SemiBold }}>see all</Text>
        </View>
        <FlatList
          data={offersBannersList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingTop: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function foodCategoriesInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("RestaurantsList")}
        style={{ alignItems: "center", marginRight: Sizes.fixPadding + 5.0 }}
      >
        <Image
          source={item.foodImage}
          style={{
            width: width * 0.18,
            height: width * 0.19,
            borderRadius: Sizes.fixPadding,
          }}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor11SemiBold,
          }}
        >
          {item.category}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View>
        <Text
          style={{
            marginTop: Sizes.fixPadding * 2.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor16SemiBold,
          }}
        >
          Food Categories
        </Text>
        <FlatList
          data={foodCategoriesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingTop: Sizes.fixPadding,
          }}
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
