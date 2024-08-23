import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../App';

const sizesList = [
  'Medium', 'Small', 'Large', 'Extra Large'
];

const CartScreen = ({ navigation }) => {
  const [cartContents, setCartContents] = useState([]);
  const totalPrice = cartContents.map(item => item.quantity*item.items[0].price).reduce((total, price) => total + price, 0);
    // const tax = 2.5;
  const extraCharges = cartContents.flatMap(item => item.extraFees).reduce((acc, extra) => acc+extra.charge, 0);
  const payableAmount = (totalPrice + extraCharges)

  // const [state, setState] = useState({
  //   showSizeOptions: true,
  //   currentOptionsId: null,
  // })

  // const updateState = (data) => setState((state) => ({ ...state, ...data }))

  // const {
  //   showSizeOptions,
  //   currentOptionsId,
  // } = state;

  const onCheckoutPress = () => {
    const cartedItems = cartContents.map(({id, quantity}) => ({id, quantity}));
    navigation.push('SelectDeliveryAddress',
      {carted:cartedItems,
        payable:{amount:payableAmount, currency:cartContents.at(0)?.items[0].currency}
      }
    )
  }

  const getAndSetCartContents = async () => {
    try {
      const getCartContents = httpsCallable(functions, 'getCartContents');
      const {contents} = (await getCartContents()).data;
      setCartContents(contents);
    } catch (error) {
      console.log('An error occured while getting restaus: ', error);
    };
  };

  useEffect(() => {
    getAndSetCartContents()
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1, }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {cartProductsInfo()}
              {totalInfo()}
              {proceedToCheckoutButton()}
            </>
          }
          contentContainerStyle={{ paddingTop: Sizes.fixPadding - 9.0, paddingBottom: Sizes.fixPadding * 7.0, }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )

  function totalInfo() {
    
    return (
      <View style={styles.totalInfoWrapStyle}>
        <View style={styles.subTotalWrapStyle}>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            Sub Total
          </Text>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            {totalPrice.toFixed(1)}{` XAF`}
          </Text>
        </View>
        {
          cartContents.flatMap(item => item.extraFees).map((fee, index) => (
            <View key={fee.feeId+index} style={{ padding: Sizes.fixPadding }}>
              {/* <View style={styles.totalDetailWrapStyle}>
                  <Text style={{ ...Fonts.blackColor15Medium }}>
                      Service Tax
                  </Text>
                  <Text>
                      {`$`}
                  </Text>
              </View> */}
              <View style={{ paddingVertical: Sizes.fixPadding, ...styles.totalDetailWrapStyle }}>
                <Text style={{ ...Fonts.blackColor15Medium }}>
                  {fee.name}
                </Text>
                <Text>
                  {fee.charge} {fee.currency}
                </Text>
              </View>
              <View style={styles.totalDetailWrapStyle}>
                <Text style={{ ...Fonts.primaryColor15SemiBold }}>
                  Amount Payable
                </Text>
                <Text style={{ ...Fonts.primaryColor15SemiBold }}>
                  {payableAmount.toFixed(1)}{` XAF`}
                </Text>
              </View>
            </View>
          ))
        }
      </View>
    )
  }

  function proceedToCheckoutButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onCheckoutPress}
        style={styles.proceedToCheckoutButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>
          Proceed To Checkout
        </Text>
      </TouchableOpacity>
    )
  }

  // function updateProductSize({ id, selectedSize }) {
  //   const newList = cartContents.map((item) => {
  //     if (item.id === id) {
  //       const updatedItem = { ...item, size: selectedSize };
  //       return updatedItem;
  //     }
  //     return item;
  //   });
  //   setCartContents(newList);
  // }

  function updateItemCount({ id, type }) {
    const newList = cartContents.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item, quantity: type == 'remove' ?
            item.quantity > 1
              ?
              item.quantity - 1
              : item.quantity
            :
            item.quantity + 1
        };
        return updatedItem;
      }
      return item;
    });
    setCartContents(newList);
  }

  function cartProductsInfo() {
    const renderItem = ({ item }) => {
      return (
      <View style={styles.productWrapStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          {
            item.items.map((foodItem, index) =>(
              <View key={index} style={{ flex: 1, flexDirection:'row', justifyContent:'space-between', padding: Sizes.fixPadding, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                  {foodItem.name}
                </Text>
                <View style={{ flex: 0.6, }}>
                  <Image
                    source={foodItem.imagesUrls.at(0)}
                    style={styles.productImageStyle}
                  />
                </View>
              </View>
            ))
          }
          <View style={{ flex: 0.6, }}>
            <Image
              source={item.foodImage}
              style={styles.productImageStyle}
            />
          </View>
        </View>
        <View style={styles.productSizeAndCountInfoWrapStyle}>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...Fonts.blackColor12SemiBold }}>
              Size
            </Text>
            <Menu
              visible={currentOptionsId == item.id ? showSizeOptions : false}
              anchor={
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => updateState({ currentOptionsId: item.id, showSizeOptions: true })}
                  style={{ marginLeft: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center' }}
                >
                  <Text style={{ ...Fonts.primaryColor11SemiBold }}>
                    {item.size}
                  </Text>
                  <MaterialIcons
                    name='keyboard-arrow-down'
                    size={18}
                    color={Colors.primaryColor}
                    style={{ marginLeft: Sizes.fixPadding, }}
                  />
                </TouchableOpacity>
              }
              onRequestClose={() => updateState({ showSizeOptions: false })}
            >
              <View>
                {
                  sizesList.map((size, index) => (
                    <MenuItem
                      key={`${index}`}
                      textStyle={{ ...Fonts.primaryColor12SemiBold }}
                      onPress={() => {
                        updateProductSize({ id: item.id, selectedSize: size })
                        updateState({ showSizeOptions: false })
                      }}
                    >
                      {size}
                    </MenuItem>
                  ))
                }
              </View>
            </Menu>
          </View> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: Sizes.fixPadding + 5.0, ...Fonts.blackColor12SemiBold, }}>
              {item.items[0].currency}{' '}{item.items[0].price}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => updateItemCount({ id: item.id, type: 'remove' })}
              style={styles.productAddAndRemoveButtonWrapStyle}>
              <MaterialIcons
                name='remove'
                color={Colors.whiteColor}
                size={12}
              />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor13Medium }}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => updateItemCount({ id: item.id, type: 'add' })}
              style={styles.productAddAndRemoveButtonWrapStyle}
            >
              <MaterialIcons
                name='add'
                color={Colors.whiteColor}
                size={12}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}
    return (
      <FlatList
        data={cartContents}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    )
  }

  function header() {
    return (
      <Text style={{ ...Fonts.blackColor18SemiBold, margin: Sizes.fixPadding * 2.0, }}>
        My Cart
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  productWrapStyle: {
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    elevation: 2.0,
    marginBottom: Sizes.fixPadding + 10.0,
    ...CommonStyles.shadow
  },
  productImageStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-start',
    flex: 1,
    resizeMode: 'stretch'
  },
  productSizeAndCountInfoWrapStyle: {
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    backgroundColor: '#DEE2EB',
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  productAddAndRemoveButtonWrapStyle: {
    backgroundColor: Colors.blackColor,
    width: 18.0,
    height: 18.0,
    borderRadius: Sizes.fixPadding - 7.0,
    alignItems: 'center',
    justifyContent: 'center',
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
  totalInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    elevation: 1.0,
  },
  subTotalWrapStyle: {
    backgroundColor: '#ECECEC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
  },
  totalDetailWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default CartScreen;