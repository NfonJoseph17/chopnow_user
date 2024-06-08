import React, { useState, createRef } from "react";
import { Dimensions, View, ScrollView, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@rneui/themed';
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const SigninScreen = ({ navigation }) => {

    const [state, setState] = useState({
        userName: null,
        password: null,
        passwordSecure: true,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        userName,
        password,
        passwordSecure,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {foodLogo()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}
                >
                    {signinTitle()}
                    {userNameTextField()}
                    {passwordTextField()}
                    {forgetPasswordText()}
                    {signinButton()}
                    {dontAccountInfo()}
                </ScrollView>
            </View>
        </View>
    )

    function foodLogo() {
        return (
            <Image
                source={require('../../assets/images/bg1.png')}
                style={styles.foodLogoStyle}
            />
        )
    }

    function dontAccountInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...Fonts.grayColor15Medium }}>
                    Don't have an account?
                </Text>
                <Text
                    onPress={() => navigation.push('Signup')}
                    style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Medium }}
                >
                    Sign Up
                </Text>
            </View>
        )
    }

    
    function signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Signup')}
                style={styles.signinButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Sign In
                </Text>
            </TouchableOpacity>
        )
    }

    function forgetPasswordText() {
        return (
            <Text style={styles.forgetPasswordTextStyle}>
                Forget Password?
            </Text>
        )
    }

    function passwordTextField() {
        const input = createRef();
        return (
            <Input
                ref={input}
                value={password}
                onChangeText={(text) => updateState({ password: text })}
                selectionColor={Colors.primaryColor}
                placeholder='Password'
                placeholderTextColor={Colors.grayColor}
                leftIcon={{
                    type: 'material',
                    color: Colors.grayColor,
                    name: 'lock-outline',
                    size: 20,
                    onPress: () => { input.current.focus() }
                }}
                secureTextEntry={passwordSecure}
                rightIcon={{
                    type: 'material-community',
                    color: Colors.grayColor,
                    name: passwordSecure ? 'eye-off-outline' : 'eye-outline',
                    size: 16,
                    onPress: () => { updateState({ passwordSecure: !passwordSecure }) }
                }}
                style={{ ...Fonts.blackColor15Medium, marginLeft: Sizes.fixPadding - 2.0 }}
                inputContainerStyle={{ ...styles.textFieldWrapStyle }}
                containerStyle={styles.textFieldStyle}
            />
        )
    }

    function userNameTextField() {
        const input = createRef();
        return (
            <Input
                ref={input}
                value={userName}
                onChangeText={(text) => updateState({ userName: text })}
                selectionColor={Colors.primaryColor}
                placeholder='User Name'
                placeholderTextColor={Colors.grayColor}
                leftIcon={{
                    type: 'material',
                    color: Colors.grayColor,
                    name: 'person-outline',
                    size: 20,
                    onPress: () => { input.current.focus() }
                }}
                style={{ ...Fonts.blackColor15Medium, marginLeft: Sizes.fixPadding - 2.0 }}
                inputContainerStyle={{ ...styles.textFieldWrapStyle }}
                containerStyle={{ marginBottom: Sizes.fixPadding * 3.0, marginTop: Sizes.fixPadding * 2.0, ...styles.textFieldStyle }}
            />
        )
    }

    function signinTitle() {
        return (
            <Text style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor20Bold }}>
                Sign In
            </Text>
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
                    style={{ alignSelf: 'flex-start' }}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    headerWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        height: 40.0,
        width: width - 25.0,
        alignSelf: 'center',
    },
    textFieldWrapStyle: {
        paddingHorizontal: Sizes.fixPadding,
        elevation: 1.0,
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderBottomWidth: 0.0,
        ...CommonStyles.shadow
    },
    forgetPasswordTextStyle: {
        marginTop: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignSelf: 'flex-end',
        ...Fonts.grayColor11Medium
    },
    signinButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        margin: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(255, 66, 0, 0.3)',
        borderWidth: 1.0,
        elevation: 1.0,
        shadowColor: Colors.primaryColor,
    },
    socialMediaOptionsWrapStyle: {
        marginVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    socialMediaIconWrapstStyle: {
        width: 38.0,
        height: 38.0,
        borderRadius: 19.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    foodLogoStyle: {
        width: 160,
        height: 160,
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
    }
});

export default SigninScreen;