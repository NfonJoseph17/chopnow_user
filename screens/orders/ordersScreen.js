import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';

const orderInProcessList = [
    {
        id: '1',
        orderDate: 14,
        orderMonth: 'May',
        restaurantName: 'Marine Rise Restaurant',
        orderNumber: 'CCA123654',
        totalOrderItemsCount: 3,
        totalAmount: 32.00,
        isDispatch: false,
    },
    {
        id: '2',
        orderDate: 14,
        orderMonth: 'May',
        restaurantName: 'Seven Star Restaurant',
        orderNumber: 'FTR145987',
        totalOrderItemsCount: 2,
        totalAmount: 30.00,
        isDispatch: true,
    },
];

const pastOrdersList = [
    {
        id: '1',
        orderDate: 13,
        orderMonth: 'May',
        restaurantName: 'Hunger Spot',
        orderNumber: 'DET146587',
        totalOrderItemsCount: 3,
        totalAmount: 40.00,
    },
    {
        id: '2',
        orderDate: 11,
        orderMonth: 'May',
        restaurantName: 'Food by Jesica',
        orderNumber: 'DET158973',
        totalOrderItemsCount: 4,
        totalAmount: 54.00,
    },
    {
        id: '3',
        orderDate: 10,
        orderMonth: 'May',
        restaurantName: 'Hunger Spot',
        orderNumber: 'TYR147896',
        totalOrderItemsCount: 4,
        totalAmount: 42.00,
    },
    {
        id: '4',
        orderDate: 9,
        orderMonth: 'May',
        restaurantName: 'Marine Rise Restaurant',
        orderNumber: 'TeQ145632',
        totalOrderItemsCount: 2,
        totalAmount: 35.00,
    },
];

const OrdersScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <View style={{ flex: 1, }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {ordersInProcessInfo()}
                            {pastOrdersInfo()}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )

    function pastOrdersInfo() {

        const renderItem = ({ item }) => (
            <View style={styles.orderInfoWrapStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Text style={{ ...Fonts.primaryColor12SemiBold, textAlign: 'center' }}>
                            {`${item.orderDate}\n${item.orderMonth}`}
                        </Text>
                        <View style={{
                            marginHorizontal: Sizes.fixPadding,
                            width: 1.5, height: '90%', backgroundColor: Colors.grayColor
                        }}></View>
                        <View style={{ marginTop: Sizes.fixPadding - 15.0, flex: 1 }}>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.restaurantName}
                            </Text>
                            <Text style={{ ...Fonts.grayColor11Medium }}>
                                Order number: {item.orderNumber}
                            </Text>
                            <Text style={{ ...Fonts.grayColor11Medium }}>
                                {item.totalOrderItemsCount} Items
                            </Text>
                        </View>
                    </View>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {`$`}{item.totalAmount.toFixed(2)}
                    </Text>
                </View>
                <View style={{
                    ...styles.orderStatusWrapStyle,
                    backgroundColor: '#F5F5F5',
                }}>
                    <Text style={{ ...Fonts.grayColor15SemiBold }}>
                        Confirmed
                    </Text>
                </View>
            </View>
        )
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding * 2.0, ...Fonts.grayColor16SemiBold }}>
                    Past Orders
                </Text>
                <FlatList
                    listKey='pastOrders'
                    data={pastOrdersList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function ordersInProcessInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('OrderDetail')}
                style={styles.orderInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Text style={{ ...Fonts.primaryColor12SemiBold, textAlign: 'center' }}>
                            {`${item.orderDate}\n${item.orderMonth}`}
                        </Text>
                        <View style={{
                            marginHorizontal: Sizes.fixPadding,
                            width: 1.5, height: '90%', backgroundColor: Colors.grayColor
                        }}></View>
                        <View style={{ marginTop: Sizes.fixPadding - 15.0, flex: 1 }}>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.restaurantName}
                            </Text>
                            <Text style={{ ...Fonts.grayColor11Medium }}>
                                Order number: {item.orderNumber}
                            </Text>
                            <Text style={{ ...Fonts.grayColor11Medium }}>
                                {item.totalOrderItemsCount} Items
                            </Text>
                        </View>
                    </View>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {`$`}{item.totalAmount.toFixed(2)}
                    </Text>
                </View>
                <View style={{
                    ...styles.orderStatusWrapStyle,
                    backgroundColor: item.isDispatch ? '#EDF7ED' : '#FFECE5',
                }}>
                    {
                        item.isDispatch ?
                            <Text style={{ ...Fonts.greenColor15SemiBold }}>
                                Dispatch
                            </Text>
                            :
                            <Text style={{ ...Fonts.primaryColor15SemiBold }}>
                                Preparing
                            </Text>
                    }
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding * 2.0, ...Fonts.grayColor16SemiBold }}>
                    Orders in process
                </Text>
                <FlatList
                    listKey='processOrders'
                    data={orderInProcessList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function header() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                My Orders
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    orderStatusWrapStyle: {
        paddingHorizontal: Sizes.fixPadding + 5.0,
        alignSelf: 'flex-end',
        paddingVertical: Sizes.fixPadding - 3.0,
        borderRadius: Sizes.fixPadding * 2.0,
    },
    orderInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding + 3.0,
        paddingBottom: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        ...CommonStyles.shadow
    }
})

export default OrdersScreen;