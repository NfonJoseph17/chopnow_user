import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, FlatList, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../App";



const RestaurantsListScreen = ({ navigation }) => {
  const [restaus, setRestaus] = useState([]);
  
  const getAndSetRestaus = async () => {
    try {
      const getRestausList = httpsCallable(functions, 'getRestausList');
      const {restaus} = (await getRestausList({filter:'all'})).data;
      setRestaus(restaus);
      console.log('Restaus: ', restaus)
    } catch (error) {
      console.log('An error occured while getting restaus: ', error);
    };
  };

  useEffect(() => {
    getAndSetRestaus();
  }, [])
  
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {restaurants()}
      </View>
    </View>
  )

  function restaurants() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('RestaurantDetail', { id: item.id })}
        style={styles.restaurantsWrapStyle}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{uri:item.logoUrl}}
              style={{ width: 40.0, height: 40.0, borderRadius: Sizes.fixPadding - 5.0, }}
            />
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
              <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                {item.label}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.primaryColor12SemiBold }}>
              {item.rating.toFixed(1)}
            </Text>
            <MaterialIcons
              name='star'
              color={Colors.primaryColor}
              size={14}
            />
          </View>
        </View>
        <View style={{ marginLeft: Sizes.fixPadding - 3.0, marginTop: Sizes.fixPadding - 5.0, flex: 1, flexDirection: 'row', }}>
          <MaterialIcons
            name='location-on'
            color={Colors.primaryColor}
            size={16}
          />
          <Text style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor13Medium }}>
            {item.location} | {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <FlatList
        data={restaus}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.blackColor}
          size={22}
          onPress={() => navigation.pop()}
        />
        <MaterialIcons
          name="search"
          color={Colors.blackColor}
          size={22}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  restaurantsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  headerWrapStyle: {
    margin: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default RestaurantsListScreen;