import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";
import { httpsCallable } from "firebase/functions";
import { useFocusEffect } from "expo-router";

const paymentMethodsList = [
  {
    id: '1',
    paymentMethod: 'MTN Momo',
    paymentMethodIcon: require('../../assets/images/paymentMethod/wallet.png'),
  },
  {
    id: '2',
    paymentMethod: 'Orange Money',
    paymentMethodIcon: require('../../assets/images/paymentMethod/card.png'),
  },

];

const SelectPaymentMethodScreen = ({ navigation, route }) => {
  const payable = route.params.payable;
  const [selectedPaymentMethodId, setselectedPaymentMethodId] = useState(paymentMethodsList[1].id)
  const [paymentMethods, setPaymentMethods] = useState([]);

  const getAndSetPaymentMethods = async () => {
    try {
      const getPaymentMethods = httpsCallable(functions, 'getPaymentMethods');
      const result = await getPaymentMethods();
      setPaymentMethods(result.data.methods);
    } catch (error) {
      console.lot('An error occured while getting payment methods: ', error.message);
    }
  };

  console.log('Payment Methods : ', paymentMethods)
  useFocusEffect(() => {
    getAndSetPaymentMethods()
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {paymentMethodInfo()}
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
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
        onPress={() => navigation.push('OrderPlaceInfo')}
        style={styles.proceedToCheckoutButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>
          Make Payment
        </Text>
      </TouchableOpacity>
    )
  }

  function amountPayableInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>
          Amount Payable
        </Text>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>
          {payable.amount.toFixed(2)} {payable.currency}
        </Text>
      </View>
    )
  }

  function paymentMethodInfo() {
    const renderItem = ({ item, index }) => (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setselectedPaymentMethodId(item.id)}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.radioButtonOuterStyle}>
              {
                selectedPaymentMethodId == item.id
                  ?
                  <View style={styles.radioButtonInnerStyle}>

                  </View>
                  :
                  null
              }
            </View>
            <Text style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.blackColor13Medium }}>
              {item.label}
            </Text>
          </View>
          <Image
            source={
              item.operator==='mtnmomo'?
              require('../../assets/images/paymentMethod/mtnmomo.png')
              :
              item.operator==='orangemomo'?
              require('../../assets/images/paymentMethod/orangemomo.png')
              :undefined
            }
            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        {
          index == paymentMethodsList.length - 1
            ?
            null
            :
            <View
              style={{ marginVertical: Sizes.fixPadding * 2.0, backgroundColor: Colors.grayColor, height: 1.0, }}
            />
        }
      </View>
    )
    return (
      <View style={styles.paymentMethodInfoWrapStyle}>
        <Text style={{ marginBottom: Sizes.fixPadding + 10.0, textAlign: 'center', ...Fonts.blackColor16SemiBold }}>
          How'd you like to pay?
        </Text>
        <FlatList
          data={paymentMethods}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
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
          Select Payment Method
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
  paymentMethodInfoWrapStyle: {
    marginVertical: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    elevation: 1.0,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding * 3.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    ...CommonStyles.shadow
  },
  radioButtonOuterStyle: {
    width: 16.0,
    height: 16.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: 8.0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioButtonInnerStyle: {
    width: 10.0,
    height: 10.0,
    borderRadius: 5.0,
    backgroundColor: Colors.primaryColor
  }
});

export default SelectPaymentMethodScreen;