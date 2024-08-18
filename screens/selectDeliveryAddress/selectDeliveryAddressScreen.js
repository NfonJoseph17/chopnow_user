import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../App";

const addressesList = [
  {
    id: '1',
    addressType: 'Home',
    address: 'Standard Lodge, Room 24 Bambili',
    mobileNo: '+237 676858216',
  },
  {
    id: '2',
    addressType: 'Office',
    address: 'Shed 53, katika Junction, Bambili',
    mobileNo: '+237 676858216',
  },
];

const SelectDeliveryAddressScreen = ({ navigation, route }) => {
  const [selectedAddressId, setselectedAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  
  
  const getAndSetAddresses = async () => {
    try {
      const getDeliveryAddresses = httpsCallable(functions, 'getDeliveryAddresses');
      const result = await getDeliveryAddresses();
      setAddresses(result.data.addresses);
    } catch (error) {
      console.log('An error occured while getting delivery addresses: ', error);
    }
  };

  useEffect(() => {
    getAndSetAddresses()
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {renderAddresses()}
              {addNewAddressInfo()}
            </>
          }
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{ backgroundColor: Colors.bodyBackColor }}>
        {amountPayableInfo()}
        {proceedToCheckoutButton()}
      </View>
    </View>
  )

  function proceedToCheckoutButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('SelectPaymentMethod')}
        style={styles.proceedToCheckoutButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>
          Proceed To Payment
        </Text>
      </TouchableOpacity>
    )
  }

  function amountPayableInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>
          Amount Payable
        </Text>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>
          4500.00 XAF
        </Text>
      </View>
    )
  }

  function addNewAddressInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push('AddNewAddress')}
        style={styles.addNewAddressInfoWrapStyle}
      >
        <Text style={{ ...Fonts.blackColor16SemiBold }}>
          Add New address
        </Text>
        <View style={styles.addAddressIconWrapStyle}>
          <MaterialIcons
            name="add"
            color={Colors.whiteColor}
            size={14}
          />
        </View>
      </TouchableOpacity>
    )
  }

  function renderAddresses() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setselectedAddressId(item.id)}
        style={styles.addressWrapStyle}
      >
        <View style={styles.addressTypeWrapStyle}>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            {item.label} ({item.type})
          </Text>
          <View style={styles.radioButtonOuterStyle}>
            {
              selectedAddressId == item.id
                ?
                <View
                  style={styles.radioButtonInnerStyle}
                />
                :
                null
            }
          </View>
        </View>
        <View style={{ padding: Sizes.fixPadding, }}>
          <Text style={{ ...Fonts.blackColor13Light }}>
            {item.houseNo}; {item.streetName}
          </Text>
          <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor13SemiBold }}>
            {item.phone}
          </Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <View>
        <FlatList
          data={addresses}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
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
          Select Delivery Address
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
  addressWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 1.0,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    ...CommonStyles.shadow
  },
  addressTypeWrapStyle: {
    backgroundColor: '#ECECEC',
    padding: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  radioButtonOuterStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    width: 16.0,
    height: 16.0,
    borderRadius: 8.0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioButtonInnerStyle: {
    width: 10.0,
    height: 10.0,
    borderRadius: 5.0,
    backgroundColor: Colors.primaryColor
  },
  addNewAddressInfoWrapStyle: {
    backgroundColor: '#E0E1E6',
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding + 5.0,
  },
  addAddressIconWrapStyle: {
    width: 16.0,
    height: 16.0,
    borderRadius: 8.0,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  proceedToCheckoutButtonStyle: {
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

export default SelectDeliveryAddressScreen;