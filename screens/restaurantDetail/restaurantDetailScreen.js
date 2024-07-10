import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList, TouchableOpacity, Dimensions, ScrollView, StyleSheet, ImageBackground, Image, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from "react-native-paper";
import MyStatusBar from "../../components/myStatusBar";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../App";

const { width } = Dimensions.get('window');

const RestaurantDetailScreen = ({ navigation, route }) => {
  const [isFavorite, setisFavorite] = useState(false)
  const [showSnackBar, setshowSnackBar] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [restauInfos, setRestauInfos] = useState(null);

  const getReviews = async () => {
    try {
      const getRestauReviews = httpsCallable(functions, 'getRestauReviews');
      const {reviews} = (await getRestauReviews({restauId:route.params.id})).data;
      setReviews(reviews);
    } catch (error) {
      console.log('Error occured when getting restau reviews: ', error);
    }
  };

  const getRestauInfos = async () => {
    try {
      const getRestauById = httpsCallable(functions, 'getRestauById');
      const {restau} = (await getRestauById({restauId:route.params.id})).data;
      setRestauInfos(restau);
    } catch (error) {
      console.log('Error occured when getting restau reviews: ', error);
    }
  };

  useEffect(() => {
    getReviews();
    getRestauInfos();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../assets/images/food/food15.png')}
          style={{ height: 200.0, width: '100%', flex: 1 }}
        >
          {header()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: StatusBar.currentHeight + Sizes.fixPadding * (Platform.OS == 'android' ? 2.0 : 3.0),
            }}
          >
            {restaurantDetail()}

            {peopleReviewsInfo()}
            {orderFoodNowButton()}
          </ScrollView>
        </ImageBackground>
        {snackBar()}
      </View>
    </View>
  )

  function snackBar() {
    return (
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => { setshowSnackBar(false) }}
        elevation={0}
      >
        <Text style={{ ...Fonts.whiteColor15Medium }}>
          {isFavorite ? 'added to favorites' : 'removed from favorites'}
        </Text>
      </Snackbar>
    )
  }

  function orderFoodNowButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('FoodOfDifferentCategories')}
        style={styles.orderFoodNowButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>
          Order Food Now
        </Text>
      </TouchableOpacity>
    )
  };

  function peopleReviewsInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
        <Text style={{ marginBottom: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
          What People Says
        </Text>
        {
          reviews.map((item) => (
            <View
              key={`${item.id}`}
              style={styles.reviewsWrapStyle}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{uri:item.author.profileImgUrl}}
                    style={{ width: 60.0, height: 60.0, borderRadius: 30.0, }}
                  />
                  <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                      {item.author.fullName}
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                      {item.createdAt}
                    </Text>
                  </View>
                </View>
                {showRating({ number: item.rating })}
              </View>
              <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Regular }}>
                {item.description}
              </Text>
            </View>
          ))
        }
      </View>
    )
  }

  function showRating({ number }) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {
          (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 || number == 1.0)
            ?
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.primaryColor}
            />
            :
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.grayColor}
            />
        }
        {
          (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0)
            ?
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.primaryColor}
            />
            :
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.grayColor}
            />
        }
        {
          (number == 5.0 || number == 4.0 || number == 3.0)
            ?
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.primaryColor}
            />
            :
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.grayColor}
            />
        }
        {
          (number == 5.0 || number == 4.0)
            ?
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.primaryColor}
            />
            :
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.grayColor}
            />
        }
        {
          (number == 5.0) ?
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.primaryColor}
            />
            :
            <MaterialIcons
              name="star"
              size={16}
              color={Colors.grayColor}
            />
        }
      </View>
    )
  }



  function restaurantDetail() {
    return (
      <View style={styles.restaurantDetailWrapStyle}>
        <View style={styles.restuarantInfoWrapStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{uri:restauInfos?.logoUrl}}
                style={styles.restaurantLogoStyle}
              />
              <View style={{ flex: 1, marginLeft: Sizes.fixPadding * 7.7, }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                  {restauInfos?.name}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.primaryColor12SemiBold }}>
                {restauInfos?.rating.toFixed(1)}
              </Text>
              <MaterialIcons
                name='star'
                color={Colors.primaryColor}
                size={14}
              />
            </View>
          </View>
          <Text style={{ ...Fonts.grayColor14Medium }}>
            {restauInfos?.label}
          </Text>
          <View style={{ marginTop: Sizes.fixPadding - 5.0, flex: 1, flexDirection: 'row', }}>
            <MaterialIcons
              name='location-on'
              color={Colors.primaryColor}
              size={16}
            />
            <Text style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor13Medium }}>
              {restauInfos?.address}
            </Text>
          </View>
        </View>
        <View style={styles.aboutRestaurantWrapStyle}>
          <Text style={{ ...Fonts.blackColor14SemiBold }}>
            About Restaurant
          </Text>
          <Text style={{ marginLeft: Sizes.fixPadding + 10.0, ...Fonts.grayColor12Regular }}>
            {restauInfos?.presentation}
          </Text>
        </View>
      </View>
    )
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.whiteColor}
          size={22}
          onPress={() => navigation.pop()}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            color={Colors.whiteColor}
            size={22}
            style={{ marginRight: Sizes.fixPadding + 10.0, }}
            onPress={() => { setisFavorite(!isFavorite), setshowSnackBar(true) }}
          />
          <MaterialIcons
            name="share"
            color={Colors.whiteColor}
            size={22}
          />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  headerWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  aboutRestaurantWrapStyle: {
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    backgroundColor: '#DEE2EB'
  },
  restaurantLogoStyle: {
    width: 70.0,
    position: 'absolute',
    bottom: -5.0,
    height: 70.0,
    borderRadius: Sizes.fixPadding,
  },
  restuarantInfoWrapStyle: {
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding
  },
  restaurantDetailWrapStyle: {
    backgroundColor: '#DEE2EB',
    borderRadius: Sizes.fixPadding,
    margin: Sizes.fixPadding * 2.0,
  },
  popularFoodImageStyle: {
    width: '100%',
    height: '100%',
    flex: 1,
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
  },
  popularItemsWrapStyle: {
    backgroundColor: '#DEE2EB',
    borderRadius: Sizes.fixPadding,
    width: width / 1.8,
    height: 105.0,
    marginRight: Sizes.fixPadding * 2.0,
    flex: 1,
  },
  reviewsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
    elevation: 0.20,
    borderColor: '#E9EAF0',
    borderWidth: 1.0,
    ...CommonStyles.shadow
  },
  orderFoodNowButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(255, 66, 0, 0.3)',
    borderWidth: 1.0,
    elevation: 1.0,
  }
});

export default RestaurantDetailScreen;