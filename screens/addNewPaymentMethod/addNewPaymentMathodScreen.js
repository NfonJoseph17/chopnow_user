import React, { useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity, FlatList, Image, StyleSheet, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from "@rneui/themed";
import MyStatusBar from "../../components/myStatusBar";
import { httpsCallable } from "firebase/functions";
import { functions } from '../../App'

const cardTypesList = [
  {
    id: '1',
    cardImage: require('../../assets/images/paymentMethod/visa.png'),
    cardType: 'Visa card',
  },
  {
    id: '2',
    cardImage: require('../../assets/images/paymentMethod/mastercard.png'),
    cardType: 'Master card',
  },
];

const paymentMethodTypesList = [
  {
    id:'4',
    paymentIcon: require('../../assets/images/paymentMethod/mtnmomo.png'),
    paymentType:'mtnmomo'
  },
  {
    id:'5',
    paymentIcon: require('../../assets/images/paymentMethod/orangemomo.png'),
    paymentType:'orangemomo'
  },
];

const emailAddressesList = [
  'paupal@mydomain.net',
  'sales@mydomain.net'
];

const AddNewPaymentMethodScreen = ({ navigation }) => {
  
  const [state, setState] = useState({
    selectedPaymentMethodType: paymentMethodTypesList[0].paymentType,
    label:'',
    type:'momo',
    phoneNumber:''
  })

  const updateState = (data) => setState((state) => ({ ...state, ...data }))

  const {
    selectedPaymentMethodType,
    label,
    type,
    phoneNumber
  } = state;

  const onAddPaymentMethod = async () => {
    try {
      const addPaymentMethod = httpsCallable(functions, 'addPaymentMethod');
      await addPaymentMethod({label, type, phoneNumber, operator:selectedPaymentMethodType})
      navigation.pop();
    } catch (error) {
      console.log('An error occured while adding payment method: ', error);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
        >
          {paymentMethodTypes()}
          {
            selectedPaymentMethodType == 'card'
              ?
              <>
                {cardDetail()}
                {selectCardTypeBottomSheet()}

              </>
              :
              selectedPaymentMethodType == 'onlinePaymentSystem'
                ?
                <>
                  {addEmailInfo()}
                  {userEmails()}
                  {addNewEmailClicked
                    ?
                    newEmailAddressTextField()
                    :
                    null
                  }
                </>
                :
                selectedPaymentMethodType === 'netBanking'?
                bankingInfo()
                :
                selectedPaymentMethodType ==='mtnmomo'?
                momoInfos()
                :
                selectedPaymentMethodType ==='orangemomo'?
                momoInfos()
                :
                <View>
                  <Text>Please, Choose an Option</Text>
                </View>
          }
        </ScrollView>
      </View>
      {
        selectedPaymentMethodType == 'onlinePaymentSystem' && addNewEmailClicked == false
          ?
          addNewEmailAddressButton()
          :
          addButton()
      }
    </View>
  );

  
  function momoInfos () {
    return (
      <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View>
          <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor14SemiBold }}>
            Payment Method Label
          </Text>
          <TextInput
            value={label}
            onChangeText={(text) => updateState({ label: text })}
            selectionColor={Colors.primaryColor}
            style={styles.textFieldStyle}
            placeholder={`Eg. Home ${selectedPaymentMethodType.toLocaleUpperCase()}`}
          />
        </View>
        <View style={{ marginTop: Sizes.fixPadding + 5.0, }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 2.0, ...Fonts.blackColor14SemiBold }}>
          Phone Number
        </Text>
        <TextInput
          value={phoneNumber}
          onChangeText={(text) => updateState({ phoneNumber: text })}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
          placeholder="+237 XXX XXX XXX"
          keyboardType="phone-pad"
        />
      </View>
      </View>
    )
  };

  function bankingInfo() {
    return (
      <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0 }}>
        {nameOfBeneficiaryInfo()}
        {nameOfBankInfo()}
        {accountNumberInfo()}
        {ifscCodeInfo()}
      </View>
    )
  }

  function ifscCodeInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0, }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 2.0, ...Fonts.blackColor14SemiBold }}>
          IFSC Code
        </Text>
        <TextInput
          value={ifscCode}
          onChangeText={(text) => updateState({ ifscCode: text })}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
        />
      </View>
    )
  }

  function accountNumberInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0, }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 2.0, ...Fonts.blackColor14SemiBold }}>
          Account Number
        </Text>
        <TextInput
          value={accountNumber}
          keyboardType="numeric"
          onChangeText={(text) => updateState({ accountNumber: text })}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
        />
      </View>
    )
  }

  function nameOfBankInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0, }}>
        <Text style={{ marginBottom: Sizes.fixPadding - 2.0, ...Fonts.blackColor14SemiBold }}>
          Name of Bank
        </Text>
        <TextInput
          value={nameOfBank}
          onChangeText={(text) => updateState({ nameOfBank: text })}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
        />
      </View>
    )
  }

  function nameOfBeneficiaryInfo() {
    return (
      <View>
        <Text style={{ marginBottom: Sizes.fixPadding - 2.0, ...Fonts.blackColor14SemiBold }}>
          Name of Beneficiary
        </Text>
        <TextInput
          value={nameOfBeneficiary}
          onChangeText={(text) => updateState({ nameOfBeneficiary: text })}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
        />
      </View>
    )
  }

  function newEmailAddressTextField() {
    return (
      <TextInput
        value={newEmail}
        onChangeText={(text) => updateState({ newEmail: text })}
        selectionColor={Colors.primaryColor}
        style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...styles.textFieldStyle }}
        placeholder='Add New Paypal Email Address'
        placeholderTextColor={Colors.grayColor}
      />
    )
  }

  function addNewEmailAddressButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => updateState({ addNewEmailClicked: true })}
        style={styles.addAndAddNewEmailButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>
          Add New Email Address
        </Text>
      </TouchableOpacity>
    )
  }

  function userEmails() {
    return (
      <View style={styles.userEmailsWrapStyle}>
        {
          emailAddressesList.map((item, index) => (
            <View
              key={`${index}`}
              style={{}}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedEmailAddress: item })}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/images/paymentMethod/paypal.png')}
                    style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                  />
                  <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor13Medium }}>
                    {item}
                  </Text>
                </View>
                <View style={styles.radioButtonStyle}>
                  {
                    selectedEmailAddress == item ?
                      <View style={{ backgroundColor: Colors.primaryColor, width: 8.0, height: 8.0, borderRadius: 4.0, }} />
                      :
                      null
                  }
                </View>
              </TouchableOpacity>
              {
                index == emailAddressesList.length - 1
                  ?
                  null :
                  <View style={{ marginVertical: Sizes.fixPadding + 5.0, backgroundColor: Colors.grayColor, height: 1.0, }} />
              }
            </View>
          ))
        }
      </View>
    )
  }

  function addEmailInfo() {
    return (
      <Text style={{ margin: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor11Medium }}>
        {`Add your paypal email address or add new one\nThis need for product delivery`}
      </Text>
    )
  }

  function addButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onAddPaymentMethod}
        style={styles.addAndAddNewEmailButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>
          Add
        </Text>
      </TouchableOpacity>
    )
  }

  function cardDetail() {
    return (
      <View>
        {cardTypeInfo()}
        {cardNumberTextField()}
        {validThruAndCvvInfo()}
      </View>
    )
  }

  function validThruAndCvvInfo() {
    return (
      <View style={{ marginVertical: Sizes.fixPadding * 3.0, marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', }}>
        <TextInput
          value={validThru}
          onChangeText={(text) => updateState({ validThru: text })}
          selectionColor={Colors.primaryColor}
          placeholder="Valid Thru"
          placeholderTextColor={Colors.grayColor}
          style={{ marginRight: Sizes.fixPadding - 5.0, flex: 1, ...styles.textFieldStyle }}
        />
        <TextInput
          secureTextEntry={true}
          keyboardType="numeric"
          value={cvv}
          placeholder="CVV"
          placeholderTextColor={Colors.grayColor}
          onChangeText={(text) => updateState({ cvv: text })}
          selectionColor={Colors.primaryColor}
          style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...styles.textFieldStyle }}
          maxLength={3}
        />
      </View>
    )
  }

  function cardNumberTextField() {
    return (
      <TextInput
        value={cardNumber}
        keyboardType="numeric"
        onChangeText={(text) => updateState({ cardNumber: text })}
        selectionColor={Colors.primaryColor}
        style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...styles.textFieldStyle }}
        placeholder='Card Number'
        placeholderTextColor={Colors.grayColor}
      />
    )
  }

  function cardTypeInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => updateState({ showSelectCarTypeSheet: true })}
        style={styles.cardTypeWrapStyle}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={selectedCard.cardImage}
            style={{ width: 40.0, height: 40.0, resizeMode: 'contain' }}
          />
          <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor13Medium }}>
            {selectedCard.cardType}
          </Text>
        </View>
        <MaterialIcons
          name="keyboard-arrow-down"
          color={Colors.grayColor}
          size={22}
        />
      </TouchableOpacity>
    )
  }

  function selectCardTypeBottomSheet() {
    return (
      <BottomSheet
        isVisible={showSelectCarTypeSheet}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
        onBackdropPress={() => { updateState({ showSelectCarTypeSheet: false }) }}
        scrollViewProps={{ scrollEnabled: false }}
      >
        <View style={{ paddingVertical: Sizes.fixPadding + 3.0, paddingHorizontal: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor }}>
          <Text style={{ marginBottom: Sizes.fixPadding, alignSelf: 'center', ...Fonts.blackColor14SemiBold }}>
            Choose Card Type
          </Text>
          {
            cardTypesList.map((item) => (
              <View key={`${item.id}`}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    updateState({ selectedCard: item, showSelectCarTypeSheet: false })
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Image
                    source={item.cardImage}
                    style={{ width: 40.0, height: 40.0, }}
                    resizeMode="contain"
                  />
                  <Text style={{ marginLeft: Sizes.fixPadding + 2.0, ...Fonts.blackColor13SemiBold }}>
                    {item.cardType}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      </BottomSheet>
    )
  }

  function paymentMethodTypes() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => updateState({ selectedPaymentMethodType: item.paymentType })}
        style={{
          borderColor: selectedPaymentMethodType == item.paymentType ? Colors.primaryColor : Colors.grayColor,
          ...styles.paymentMethodTypeWrapStyle,
        }}>
        <Image
          source={item.paymentIcon}
          style={{
            width: 27.0, height: 27.0, resizeMode: 'contain',
            // tintColor: selectedPaymentMethodType == item.paymentType ? Colors.primaryColor : Colors.blackColor
          }}
        />
      </TouchableOpacity>
    )
    return (
      <View>
        <FlatList
          data={paymentMethodTypesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: Sizes.fixPadding,
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
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
          Add New Payment Method
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
  paymentMethodTypeWrapStyle: {
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 4.0,
    marginRight: Sizes.fixPadding,
  },
  cardTypeWrapStyle: {
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 3.0,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 7.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...CommonStyles.shadow
  },
  textFieldStyle: {
    ...Fonts.blackColor13Medium,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Platform.OS == 'ios' ? Sizes.fixPadding + 3.0 : Sizes.fixPadding - 2.0,
    elevation: 2.0,
    ...CommonStyles.shadow
  },
  addAndAddNewEmailButtonStyle: {
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
  radioButtonStyle: {
    width: 15.0,
    height: 15.0,
    borderRadius: 7.5,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userEmailsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 10.0,
    marginVertical: Sizes.fixPadding * 2.0,
    ...CommonStyles.shadow
  }
});

export default AddNewPaymentMethodScreen;