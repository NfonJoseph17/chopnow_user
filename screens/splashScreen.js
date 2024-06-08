import React, { useState, useCallback } from "react";
import { BackHandler, View, StatusBar, TouchableOpacity, Image, ImageBackground, StyleSheet, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {

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
        setbackClickCount(1);
        setTimeout(() => {
            setbackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setbackClickCount] = useState(0);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={{ flex: 1 }}
            >
                <View style={styles.pageStyle}>
                    <Image
                        source={require('../assets/images/app_logo.png')}
                        style={{ alignSelf: 'center', width: 120.0, height: 120.0, resizeMode: 'contain' }}
                    />
                    <View>
                        {signinButton()}
                        {signupButton()}
                    </View>
                </View>
            </ImageBackground>
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

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Signup')}
                style={styles.signupButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        )
    }

    function signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Signin')}
                style={styles.signinButtonStyle}
            >
                <Text style={{ ...Fonts.blackColor20Bold }}>
                    Sign In
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
    },
    signinButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        margin: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
    },
    pageStyle: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingTop:Platform.OS=='ios'?Sizes.fixPadding*10.0: StatusBar.currentHeight + Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding * 4.0,
    },
    animatedView: {
        backgroundColor: Colors.blackColor,
        position: "absolute",
        bottom: 30,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
    },
});

export default SplashScreen;