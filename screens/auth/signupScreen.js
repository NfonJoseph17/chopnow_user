import React, { useState, createRef } from "react";
import { Dimensions, View, ScrollView, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@rneui/themed';
import MyStatusBar from "../../components/myStatusBar";
import { functions } from "../../App";
import { httpsCallable } from "firebase/functions";

const { width } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {

  const [state, setState] = useState({
    fullName: null,
    password: null,
    passwordSecure: true,
    email: null,
    phoneNumber: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateState = (data) => setState((state) => ({ ...state, ...data }))

  const {
    fullName,
    password,
    passwordSecure,
    email,
    phoneNumber,
  } = state;

  const onSignUpPress = async () => {
    if (loading) return;
    if(error) setError(null)

    setLoading(true);
    try {
        const createClientUser = httpsCallable(functions, 'createClientUser');
        const result = await createClientUser({ email:email, phone:phoneNumber, fullName, password, role:'client' });
        const currentUser = result.data.user;
        navigation.push('Verification')
    } catch (error) {
        console.log('An error occured while creating client user: ', error);
        setError('An error occured.')
    }
    setLoading(false);
  };

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
          {signupTitle()}
          {fullNameTextField()}
          {emailTextField()}
          {phoneNumberTextField()}
          {passwordTextField()}
          {error && <Text style={{ color:Colors.redColor, marginHorizontal: Sizes.fixPadding * 2.0, marginTop:Sizes.fixPadding }}>{error}</Text>}
          {signupButton()}
          {alreadyAccountInfo()}
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

  function alreadyAccountInfo() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...Fonts.grayColor15Medium }}>
          Already have an account?
        </Text>
        <Text
          onPress={() => navigation.push('Signin')}
          style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Medium }}
        >
          Sign In
        </Text>
      </View>
    )
  }


  function signupButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Verification')}
        style={styles.signupButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>
          Sign Up
        </Text>
      </TouchableOpacity>
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

  function phoneNumberTextField() {
    const input = createRef();
    return (
      <Input
        ref={input}
        value={phoneNumber}
        onChangeText={(text) => updateState({ phoneNumber: text })}
        selectionColor={Colors.primaryColor}
        placeholder='Phone Number'
        placeholderTextColor={Colors.grayColor}
        keyboardType="phone-pad"
        leftIcon={{
          type: 'material-community',
          color: Colors.grayColor,
          name: 'cellphone',
          size: 20,
          onPress: () => { input.current.focus() }
        }}
        style={{ ...Fonts.blackColor15Medium, marginLeft: Sizes.fixPadding - 2.0 }}
        inputContainerStyle={{ ...styles.textFieldWrapStyle }}
        containerStyle={{ marginBottom: Sizes.fixPadding * 3.0, ...styles.textFieldStyle }}
      />
    )
  }

  function emailTextField() {
    const input = createRef();
    return (
      <Input
        ref={input}
        value={email}
        onChangeText={(text) => updateState({ email: text })}
        selectionColor={Colors.primaryColor}
        placeholder='Email Address'
        placeholderTextColor={Colors.grayColor}
        leftIcon={{
          type: 'material-community',
          color: Colors.grayColor,
          name: 'email-outline',
          size: 20,
          onPress: () => { input.current.focus() }
        }}
        keyboardType="email-address"
        style={{ ...Fonts.blackColor15Medium, marginLeft: Sizes.fixPadding - 2.0 }}
        inputContainerStyle={{ ...styles.textFieldWrapStyle }}
        containerStyle={{ marginBottom: Sizes.fixPadding * 3.0, ...styles.textFieldStyle }}
      />
    )
  }

  function fullNameTextField() {
    const input = createRef();
    return (
      <Input
        ref={input}
        value={fullName}
        onChangeText={(text) => updateState({ fullName: text })}
        selectionColor={Colors.primaryColor}
        placeholder='Full Name'
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

  function signupTitle() {
    return (
      <Text style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor20Bold }}>
        Sign Up
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
  signupButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 4.0,
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

export default SignupScreen;