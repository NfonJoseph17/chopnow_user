import React from "react";
import {  View, Dimensions, TouchableOpacity, ScrollView,  Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes,CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const orderItemsList = [
    {
        id: '1',
        foodName: 'Veg Sandwich',
        qty: 1,
        totalAmount: 6.00,
    },
    {
        id: '2',
        foodName: 'Veg Frankie',
        qty: 1,
        totalAmount: 10.00,
    },
    {
        id: '3',
        foodName: 'Margherite Pizza',
        qty: 1,
        totalAmount: 12.00,
    },
];

const OrderDetailScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
                >
                    {orderDetailWithTime()}
                    {restaurantInfo()}
                    {orderItemsWithQtyAndAmount()}
                </ScrollView>
            </View>
            {trackOrderButton()}
        </View>
    )

    function trackOrderButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('TrackOrder')}
                style={styles.trackOrderButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Track Order
                </Text>
            </TouchableOpacity>
        )
    }

    function orderItemsWithQtyAndAmount() {
        return (
            <View style={styles.orderItemsWithQtyAndAmountWrapStyle}>
                <View style={styles.orderItemsWithQtyAndAmountTitalWrapStyle}>
                    <Text style={{ width: width / 2.2, ...Fonts.blackColor16SemiBold }}>
                        Order Items
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', width: 50.0, ...Fonts.blackColor16SemiBold }}>
                            Qnt.
                        </Text>
                        <Text style={{ textAlign: 'right', width: 70.0, ...Fonts.blackColor16SemiBold }}>
                            Amount
                        </Text>
                    </View>
                </View>
                <View style={{ paddingVertical: Sizes.fixPadding + 5.0, paddingHorizontal: Sizes.fixPadding, }}>
                    {
                        orderItemsList.map((item) => (
                            <View
                                key={`${item.id}`}
                                style={styles.orderItemInfoWrapStyle}>
                                <Text numberOfLines={1} style={{ width: width / 2.2, ...Fonts.blackColor13Medium }}>
                                    {item.foodName}
                                </Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ width: 50.0, textAlign: 'center', ...Fonts.blackColor13Medium }}>
                                        {item.qty}
                                    </Text>
                                    <Text style={{ width: 70.0, textAlign: 'center', ...Fonts.blackColor13Medium }}>
                                        {`$`}{item.totalAmount.toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.blackColor13Medium }}>
                            TotalAmount
                        </Text>
                        <Text style={{ ...Fonts.blackColor13Medium, marginRight: Sizes.fixPadding + 3.0, }}>
                            $28.00
                        </Text>
                    </View>
                    <View style={styles.serviceTaxInfoWrapStyle}>
                        <Text style={{ ...Fonts.grayColor11Medium }}>
                            Service Tax:{` `}
                        </Text>
                        <Text style={{ ...Fonts.blackColor11Medium }}>
                            $2.50
                        </Text>
                    </View>
                    <View style={styles.deliveryChargeInfoWrapStyle}>
                        <Text style={{ ...Fonts.grayColor11Medium }}>
                            Delivery Charge:{` `}
                        </Text>
                        <Text style={{ ...Fonts.blackColor11Medium }}>
                            $1.50
                        </Text>
                    </View>
                    <View style={styles.paidViaInfoWrapStyle}>
                        <Text style={{ ...Fonts.blackColor11SemiBold }}>
                            Paid Via Credit Card:{` `}
                        </Text>
                        <Text style={{ ...Fonts.primaryColor11SemiBold }}>
                            $32.00
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function restaurantInfo() {
        return (
            <View style={styles.restaurantInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Marine Rise Restaurant
                </Text>
                <Text style={{ ...Fonts.grayColor10Medium }}>
                    1124, Old Church Street New york, USA
                </Text>
            </View>
        )
    }

    function orderDetailWithTime() {
        return (
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {orderDetailWithTimeSort(
                            {
                                representedIcon: require('../../assets/images/icons/done.png'),
                                title: 'Order Placed',
                                value: '4:00 pm'
                            }
                        )}
                        {orderDetailWithTimeSort(
                            {
                                representedIcon: require('../../assets/images/icons/restaurant_icon.png'),
                                title: 'Preparing',
                                value: '4:05 pm'
                            }
                        )}
                        {orderDetailWithTimeSort(
                            {
                                representedIcon: require('../../assets/images/icons/ready.png'),
                                title: 'Order Ready',
                                value: '4:25 pm'
                            }
                        )}
                        {orderDetailWithTimeSort(
                            {
                                representedIcon: require('../../assets/images/icons/transist.png'),
                                title: 'In Transist',
                            }
                        )}
                        {orderDetailWithTimeSort(
                            {
                                representedIcon: require('../../assets/images/icons/delivered.png'),
                                title: 'Delivered',
                            }
                        )}
                    </View>
                </ScrollView>
            </View>
        )
    }

    function orderDetailWithTimeSort({ representedIcon, title, value }) {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, marginRight: Sizes.fixPadding + 10.0, alignItems: 'center', }}>
                <View style={styles.orderDetailRepresentedIconWrapStyle}>
                    <Image
                        source={representedIcon}
                        style={styles.orderDetailRepresentedIconStyle}
                    />
                </View>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor9Medium }}>
                    {title}
                </Text>
                <Text style={{ ...Fonts.primaryColor8SemiBold }}>
                    {value ? value : '•'}
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
                    Order
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
    orderDetailRepresentedIconWrapStyle: {
        width: 45.0,
        height: 45.0,
        borderRadius: 22.5,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderDetailRepresentedIconStyle: {
        width: 25.0,
        height: 25.0,
        resizeMode: 'contain',
        tintColor: Colors.whiteColor,
    },
    restaurantInfoWrapStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 4.5,
        backgroundColor: '#DEE2EB',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    orderItemsWithQtyAndAmountWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        ...CommonStyles.shadow
    },
    orderItemsWithQtyAndAmountTitalWrapStyle: {
        backgroundColor: '#ECECEC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding,
    },
    orderItemInfoWrapStyle: {
        marginBottom: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    serviceTaxInfoWrapStyle: {
        marginBottom: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding + 3.0,
        marginRight: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    paidViaInfoWrapStyle: {
        marginTop: Sizes.fixPadding + 3.0,
        marginRight: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    deliveryChargeInfoWrapStyle: {
        marginRight: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    trackOrderButtonStyle: {
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

export default OrderDetailScreen;