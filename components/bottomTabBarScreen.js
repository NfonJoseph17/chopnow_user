import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, BackHandler, Platform } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import ProfileScreen from "../screens/profile/profileScreen";
import HomeScreen from "../screens/home/homeScreen";
import CartScreen from "../screens/cart/cartScreen";
import OrdersScreen from "../screens/orders/ordersScreen";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "./myStatusBar";

const { width } = Dimensions.get('window');

const BottomTabBarScreen = ({ navigation, route }) => {

    const backAction = () => {
        if (Platform.OS === "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            backClickCount == 1 ? BackHandler.exitApp() : _spring();
            return true;
        }
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            navigation.addListener("gestureEnd", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
                navigation.removeListener("gestureEnd", backAction);
            };
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        currentIndex: route.params ? route.params.index : 1,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount } = state;

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar />
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                {currentIndex == 1 ?
                    <HomeScreen navigation={navigation} /> :
                    currentIndex == 2 ?
                        <CartScreen navigation={navigation} />
                        :
                        currentIndex == 3 ?
                            <OrdersScreen navigation={navigation} />
                            :
                            <ProfileScreen navigation={navigation} changeIndex={changeIndex} />
                }
                <View style={styles.bottomTabBarStyle}>
                    {bottomTabBarItem({
                        index: 1,
                        icon: require('../assets/images/icons/home.png'),
                        tabName: 'Home',
                    })}
                    {bottomTabBarItem({
                        index: 2,
                        icon: require('../assets/images/icons/cart.png'),
                        tabName: 'Cart',
                    })}
                    {bottomTabBarItem({
                        index: 3,
                        icon: require('../assets/images/icons/order.png'),
                        tabName: 'My Orders',
                    })}
                    {bottomTabBarItem({
                        index: 4,
                        icon: require('../assets/images/icons/profile.png'),
                        tabName: 'Profile',
                    })}
                </View>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </View>
    )

    function changeIndex({ index }) {
        updateState({ currentIndex: index })
    }

    function bottomTabBarItem({ index, icon, tabName }) {
        return (
            <>
                {
                    currentIndex == index ?
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => changeIndex({ index: index })}
                            style={styles.selectedTabStyle}
                        >
                            <Image
                                source={icon}
                                style={{ width: 25.0, height: 25.0, resizeMode: 'contain' }}
                                tintColor={currentIndex == index ? Colors.primaryColor : Colors.grayColor}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor14Bold }}>
                                {tabName}
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ currentIndex: index })}
                        >
                            <Image
                                source={icon}
                                style={{ width: 25.0, height: 25.0, resizeMode: 'contain' }}

                            />
                        </TouchableOpacity>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1.0,
        elevation: 2.0,
    },
    selectedTabStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#FFD9CC',
        borderRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        paddingLeft: Sizes.fixPadding,
        width: width / 2.7,
    },
    animatedView: {
        backgroundColor: Colors.blackColor,
        position: "absolute",
        bottom: 30,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BottomTabBarScreen;