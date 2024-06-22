import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';
import MyStatusBar from '../../components/myStatusBar';

const sizesList = [
    'Medium', 'Small', 'Large', 'Extra Large'
];

const productsList = [
    {
        id: '1',
        foodImage: require('../../assets/images/food/food13.png'),
        foodName: 'Fufu and Kati Kati',
        // cusomization: 'Sauce tomato,mozzarella, chilly etc.',
        // timeToDelivered: '25 min',
        itemCount: 1,
        amount: 1500.0,
        size: sizesList[0],
    },
    {
        id: '2',
        foodImage: require('../../assets/images/food/food18.png'),
        foodName: 'Fried Rice and chicken',
        cusomization: 'Sauce tomato,mozzarella, chilly etc.',
        timeToDelivered: '35 min',
        itemCount: 1,
        amount: 1000.00,
        size: sizesList[0],
    },
    {
        id: '3',
        foodImage: require('../../assets/images/food/food19.png'),
        foodName: 'Irish Hotpot',
        cusomization: 'Sauce tomato,mozzarella, chilly etc.',
        timeToDelivered: '23 min',
        itemCount: 1,
        amount: 1500.00,
        size: sizesList[0],
    },
];

const ProductsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        products: productsList,
        showSizeOptions: false,
        currentOptionsId: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        products,
        showSizeOptions,
        currentOptionsId,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {productsInfo()}
                            {itemCountInfo()}
                        </>
                    }
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {viewCartButton()}
        </View>
    )

    function itemCountInfo() {
        return (
            <View style={styles.itemCountInfoWrapStyle}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/cart.png')}
                        style={{ width: 28.0, height: 28.0, resizeMode: 'contain' }}
                    />
                    <View style={styles.totalItemCountWrapStyle}>
                        <Text style={{ lineHeight: 12.0, ...Fonts.whiteColor10SemiBold }}>
                            3
                        </Text>
                    </View>
                </View>
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor14SemiBold }}>
                    3 items | 4000.00 XAF
                </Text>
            </View>
        )
    }

    function viewCartButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BottomTabBar', { index: 2 })}
                style={styles.viewCartButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    View Cart
                </Text>
            </TouchableOpacity>
        )
    }

    function updateProductSize({ id, selectedSize }) {
        const newList = products.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, size: selectedSize };
                return updatedItem;
            }
            return item;
        });
        updateState({ products: newList })
    }

    function updateItemCount({ id, type }) {
        const newList = products.map((item) => {
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
        updateState({ products: newList })
    }

    function productsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.productWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ flex: 1, padding: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.foodName}
                        </Text>
                        {/* <Text style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            Sauce tomato,mozzarella, chilly etc.
                        </Text> */}
                        {/* <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            25 min
                        </Text> */}
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
                        {/* <Text style={{ ...Fonts.blackColor12SemiBold }}>
                            Size
                        </Text> */}
                        {/* <Menu
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
                        > */}
                            {/* <View>
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
                        </Menu> */}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: Sizes.fixPadding + 5.0, ...Fonts.blackColor12SemiBold, }}>
                            {item.amount.toFixed(1)}{` XAF`}
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
                data={products}
                keyExtractor={(item) => `{item.id} XAF`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name='arrow-back-ios'
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    Las Vegas Complext
                </Text>
            </View>
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
    totalItemCountWrapStyle: {
        position: 'absolute', top: -8.0,
        width: 12.0,
        height: 12.0,
        borderRadius: 6.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemCountInfoWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewCartButtonStyle: {
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
    }
})

export default ProductsScreen;