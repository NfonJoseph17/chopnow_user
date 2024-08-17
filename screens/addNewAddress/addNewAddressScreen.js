import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../App";

const AddNewAddressScreen = ({ navigation }) => {
  const updateState = (data) => setState((state) => ({ ...state, ...data }))
  const [state, setState] = useState({
    deliveryTo: null,
    phoneNumber: null,
    pincode: null,
    houseNumberAndBuilding: null,
    street: null,
    selectedAddressType: 'Home',
  });

  const {
    deliveryTo,
    phoneNumber,
    pincode,
    houseNumberAndBuilding,
    street,
    selectedAddressType,
  } = state;

  

  const onAddAddressPress = async () => {
    try {
      const addAddress = httpsCallable(functions, 'addAddress');
      const result = await addAddress({
        type:selectedAddressType.toLocaleLowerCase(),
        streetName:street,
        houseNo:houseNumberAndBuilding,
        pincode:Number(pincode),
        phone:phoneNumber,
        label:deliveryTo
      });
      
      navigation.pop();
    } catch (error) {
      console.log('An error occured while adding address: ', error);
    }
  }

  
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
          {deliveryToInfo()}
          {phoneNumberInfo()}
          {pincodeInfo()}
          {houseNumberAndBuildingInfo()}
          {streetNameInfo()}
          {addressTypeInfo()}
        </ScrollView>
      </View>
      {addButton()}
    </View>
  )

  function addButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onAddAddressPress}
        style={styles.addButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>
          Add
        </Text>
      </TouchableOpacity>
    )
  }

  function addressTypeInfo() {
    return (
      <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
        <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding - 3.0, ...Fonts.blackColor14SemiBold }}>
          Address Type
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingRight: Sizes.fixPadding }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            {addressTypeSort(
              {
                addressTypeIcon: require('../../assets/images/address_type/home.png'),
                addressType: 'Home',
              }
            )}
            {addressTypeSort(
              {
                addressTypeIcon: require('../../assets/images/address_type/office.png'),
                addressType: 'Office',
              }
            )}
            {addressTypeSort(
              {
                addressTypeIcon: require('../../assets/images/address_type/other.png'),
                addressType: 'Other',
              }
            )}
          </View>
        </ScrollView>
      </View>
    )
  }

  function addressTypeSort({ addressTypeIcon, addressType }) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => updateState({ selectedAddressType: addressType })}
        style={{
          backgroundColor: selectedAddressType == addressType ? Colors.blackColor : Colors.bodyBackColor,
          ...styles.addressTypeWrapStyle,
        }}>
        <Image
          source={addressTypeIcon}
          style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
        />
        <Text style={{
          marginLeft: Sizes.fixPadding,
          ...selectedAddressType == addressType ?
            { ...Fonts.whiteColor12SemiBold } :
            { ...Fonts.blackColor12SemiBold }
        }}>
          {addressType}
        </Text>
      </TouchableOpacity>
    )
  }

  function streetNameInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
        <Text style={{ ...Fonts.blackColor14SemiBold }}>
          Street Name
        </Text>
        <TextInput
          placeholder="e.g. Back Street"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          value={street}
          onChangeText={(text) => updateState({ street: text })}
        />
      </View>
    )
  }

  function houseNumberAndBuildingInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0, }}>
        <Text style={{ ...Fonts.blackColor14SemiBold }}>
          House Number and Building
        </Text>
        <TextInput
          placeholder="e.g. Oberoi Heights"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          value={houseNumberAndBuilding}
          onChangeText={(text) => updateState({ houseNumberAndBuilding: text })}
        />
      </View>
    )
  }

  function pincodeInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
        <Text style={{ ...Fonts.blackColor14SemiBold }}>
          Pincode
        </Text>
        <TextInput
          placeholder="e.g. 123654"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          value={pincode}
          onChangeText={(text) => updateState({ pincode: text })}
          keyboardType="numeric"
        />
      </View>
    )
  }

  function phoneNumberInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0, }}>
        <Text style={{ ...Fonts.blackColor14SemiBold }}>
          Phone Number
        </Text>
        <TextInput
          placeholder="e.g. (+91) 1234567890"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          value={phoneNumber}
          onChangeText={(text) => updateState({ phoneNumber: text })}
          keyboardType="phone-pad"
        />
        <Text style={{ ...Fonts.grayColor10Medium }}>
          For all delivery related communication
        </Text>
      </View>
    )
  }

  function deliveryToInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
        <Text style={{ ...Fonts.blackColor14SemiBold }}>
          Delivery To
        </Text>
        <TextInput
          placeholder="e.g. John Doe"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          value={deliveryTo}
          onChangeText={(text) => updateState({ deliveryTo: text })}
        />
        <Text style={{ ...Fonts.grayColor10Medium }}>
          The bill will be prepared according to this name
        </Text>
      </View>
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
        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.blackColor18SemiBold }}>
          Add New Address
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  headerWrapStyle: {
    margin: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFieldStyle: {
    ...Fonts.blackColor13Medium,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Platform.OS == 'ios' ? Sizes.fixPadding + 2.0 : Sizes.fixPadding - 2.0,
    paddingHorizontal: Sizes.fixPadding,
    marginTop: Sizes.fixPadding - 3.0,
    ...CommonStyles.shadow
  },
  addressTypeWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    borderColor: Colors.blackColor,
    borderWidth: 1.0,
    paddingHorizontal: Sizes.fixPadding + 10.0,
    marginRight: Sizes.fixPadding,
  },
  addButtonStyle: {
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
});

export default AddNewAddressScreen;