import React from "react";
import { View, Image, TouchableOpacity, FlatList, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const restaurantsList = [
    {
        id: '1',
        restaurantLogo: require('../../assets/images/restaurants_logo/logo1.png'),
        restaurantName: 'Legacy Restaurant',
        restaurantAddress: 'ENS Street, Bambili',
        rating: 4.3,
        distance: '2.5 km',
        foodCategories: 'Fast food, drinks',
    },
    {
        id: '2',
        restaurantLogo: require('../../assets/images/restaurants_logo/logo2.png'),
        restaurantName: 'Las Vegas complext Restaurant',
        restaurantAddress: '3-Conners, Bambili',
        rating: 4.1,
        distance: '2.8 km',
        foodCategories: 'Fast food',
    },
    {
        id: '3',
        restaurantLogo: require('../../assets/images/restaurants_logo/logo3.png'),
        restaurantName: 'Pluto Restaurant',
        restaurantAddress: 'ENS Street, Bambili',
        rating: 4.0,
        distance: '3.50 km',
        foodCategories: 'Fast food',
    },
    {
        id: '4',
        restaurantLogo: require('../../assets/images/restaurants_logo/logo4.png'),
        restaurantName: 'Miyanui Lebanon Plaza',
        restaurantAddress: '3-Conners, Bambili',
        rating: 4.0,
        distance: '3.5 km',
        foodCategories: 'Fast food',
    },
    {
        id: '5',
        restaurantLogo: require('../../assets/images/restaurants_logo/logo5.png'),
        restaurantName: 'Crush in Black Rose Restaurant',
        restaurantAddress: '3-Conners, Bambili',
        rating: 3.5,
        distance: '4.0 km',
        foodCategories: 'Fast food',
    },
];

const RestaurantsListScreen = ({ navigation }) => {
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
                            source={item.restaurantLogo}
                            style={{ width: 40.0, height: 40.0, borderRadius: Sizes.fixPadding - 5.0, }}
                        />
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.restaurantName}
                            </Text>
                            <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                                {item.foodCategories}
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
                        {item.distance} | {item.restaurantAddress}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={restaurantsList}
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