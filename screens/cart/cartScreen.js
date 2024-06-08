import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';

const sizesList = [
    'Medium', 'Small', 'Large', 'Extra Large'
];

const cartProductsList = [
    {
        id: '1',
        foodImage: require('../../assets/images/food/food20.png'),
        foodName: 'Veg Sandwich',
        cusomization: 'Sauce tomato,mozzarella, chilly etc.',
        timeToDelivered: '25 min',
        itemCount: 1,
        amount: 6.0,
        size: sizesList[0],
    },
    {
        id: '2',
        foodImage: require('../../assets/images/food/food21.png'),
        foodName: 'Veg Frankie',
        cusomization: 'Sauce tomato,mozzarella, chilly etc.',
        timeToDelivered: '35 min',
        itemCount: 1,
        amount: 10.0,
        size: sizesList[0],
    },
    {
        id: '3',
        foodImage: require('../../assets/images/food/food22.png'),
        foodName: 'Margherite Pizza',
        cusomization: 'Sauce tomato,mozzarella, chilly etc.',
        timeToDelivered: '23 min',
        itemCount: 1,
        amount: 10.0,
        size: sizesList[0],
    },
];

const CartScreen = ({ navigation }) => {

    const [state, setState] = useState({
        cartProducts: cartProductsList,
        showSizeOptions: true,
        currentOptionsId: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        cartProducts,
        showSizeOptions,
        currentOptionsId,
    } = state;

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

        const totalPrice = cartProducts.reduce((total, item) => total + (item.itemCount * item.amount), 0);
        const tax = 2.5;
        const deliveryCharge = 1.5;
        const payableAmount = (totalPrice + tax + deliveryCharge)

        return (
            <View style={styles.totalInfoWrapStyle}>
                <View style={styles.subTotalWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Sub Total
                    </Text>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {`$`}{totalPrice.toFixed(1)}
                    </Text>
                </View>
                <View style={{ padding: Sizes.fixPadding }}>
                    <View style={styles.totalDetailWrapStyle}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Service Tax
                        </Text>
                        <Text>
                            {`$`}{tax}
                        </Text>
                    </View>
                    <View style={{ paddingVertical: Sizes.fixPadding, ...styles.totalDetailWrapStyle }}>
                        <Text style={{ ...Fonts.blackColor15Medium }}>
                            Delivery Charge
                        </Text>
                        <Text>
                            {`$`}{deliveryCharge}
                        </Text>
                    </View>
                    <View style={styles.totalDetailWrapStyle}>
                        <Text style={{ ...Fonts.primaryColor15SemiBold }}>
                            Amount Payable
                        </Text>
                        <Text style={{ ...Fonts.primaryColor15SemiBold }}>
                            {`$`}{payableAmount.toFixed(1)}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function proceedToCheckoutButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('SelectDeliveryAddress')}
                style={styles.proceedToCheckoutButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Proceed To Checkout
                </Text>
            </TouchableOpacity>
        )
    }

    function updateProductSize({ id, selectedSize }) {
        const newList = cartProducts.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, size: selectedSize };
                return updatedItem;
            }
            return item;
        });
        updateState({ cartProducts: newList })
    }

    function updateItemCount({ id, type }) {
        const newList = cartProducts.map((item) => {
            if (item.id === id) {
                const updatedItem = {
                    ...item, itemCount: type == 'remove' ?
                        item.itemCount > 1
                            ?
                            item.itemCount - 1
                            : item.itemCount
                        :
                        item.itemCount + 1
                };
                return updatedItem;
            }
            return item;
        });
        updateState({ cartProducts: newList })
    }

    function cartProductsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.productWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ flex: 1, padding: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.foodName}
                        </Text>
                        <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor14SemiBold }}>
                            25 min
                        </Text>
                    </View>
                    <View style={{ flex: 0.6, }}>
                        <Image
                            source={item.foodImage}
                            style={styles.productImageStyle}
                        />
                    </View>
                </View>
                <View style={styles.productSizeAndCountInfoWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: Sizes.fixPadding + 5.0, ...Fonts.blackColor12SemiBold, }}>
                            {`$`}{item.amount.toFixed(1)}
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
                            {item.itemCount}
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
        )
        return (
            <FlatList
                data={cartProducts}
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