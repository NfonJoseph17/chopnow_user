import React, { useState } from "react";
import { View, Dimensions, Image, FlatList, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const categoriesList = ['Fast food'];

const availableFoodList = [
    {
        id: '1',
        foodImage: require('../../assets/images/food/food12.png'),
        foodName: 'Veg Sandwich',
        amount: 6.00,
        customizable: true,
    },
    {
        id: '2',
        foodImage: require('../../assets/images/food/food16.png'),
        foodName: 'Veg Frankie',
        amount: 10.00,
        customizable: false,
    },
    {
        id: '3',
        foodImage: require('../../assets/images/food/food17.png'),
        foodName: 'Margherite Pizza',
        amount: 12.00,
        customizable: true,
    },
    {
        id: '4',
        foodImage: require('../../assets/images/food/food13.png'),
        foodName: 'Burger',
        amount: 12.00,
        customizable: false,
    },
    {
        id: '5',
        foodImage: require('../../assets/images/food/food18.png'),
        foodName: 'Veg Cheese Sandwich',
        amount: 10.00,
        customizable: true,
    },
    {
        id: '6',
        foodImage: require('../../assets/images/food/food19.png'),
        foodName: 'Crust Gourmet Pizza',
        amount: 15.00,
        customizable: true,
    },
];

const otherAvailableFoodList = [
    {
        id: '1',
        foodImage: require('../../assets/images/food/food13.png'),
        foodName: 'Fufu and Kati Kati',
        amount: 1500.00,
        customizable: false,
    },
    {
        id: '2',
        foodImage: require('../../assets/images/food/food18.png'),
        foodName: 'Fried Rice and chicken',
        amount: 1000.00,
        customizable: true,
    },
    {
        id: '3',
        foodImage: require('../../assets/images/food/food19.png'),
        foodName: 'Irish Hot pot',
        amount: 1500.00,
        customizable: false,
    },
];

const customiseOptionsList = [
    {
        id: '1',
        option: 'Extra Chicken',
        amount: 500.00,
        isSelected: false,
    },
    {
        id: '2',
        option: 'Mayonnaise',
        amount: 100.00,
        isSelected: false,
    },
];

const FoodOfDifferentCategoriesScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedCategory: categoriesList[0],
        showCustomDialog: false,
        customiseOptions: customiseOptionsList,
        selectedCustomProductName: null,
        selectedCustomProductAmount: 0,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedCategory,
        showCustomDialog,
        customiseOptions,
        selectedCustomProductName,
        selectedCustomProductAmount,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {categoriesListInfo()}
                {availableFoods()}
            </View>
            {customDialog()}
        </View>
    )

    function availableFoods() {

        const renderItem = ({ item }) => (
            <View style={styles.foodInfoWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={item.foodImage}
                        style={{
                            width: width * 0.20,
                            height: width * 0.20,
                            borderRadius: Sizes.fixPadding - 5.0,
                        }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            {item.foodName}
                        </Text>
                        <Text style={{ marginVertical: Sizes.fixPadding - 7.0, ...Fonts.blackColor12SemiBold }}>
                            {item.amount.toFixed(2)}{` XAF`}
                        </Text>
                        {
                            item.customizable
                                ?
                                <Text style={{ ...Fonts.primaryColor14Medium }}>
                                    Customise
                                </Text>
                                :
                                null
                        }
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        item.customizable
                            ?
                            updateState({ selectedCustomProductName: item.foodName, selectedCustomProductAmount: item.amount, showCustomDialog: true, })
                            :
                            navigation.push('Products');
                    }}
                    style={{ ...styles.addButtonStyle, backgroundColor: '#FFECE5', }}>
                    <Text style={{ ...Fonts.primaryColor16Medium }}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>
        )
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={selectedCategory == 'Fast food' ? otherAvailableFoodList : selectedCategory == 'Starter' ? availableFoodList : selectedCategory == 'Main Course' ? otherAvailableFoodList : availableFoodList}
                    keyExtractor={(item) => `{item.id} XAF`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding - 8.0, paddingHorizontal: Sizes.fixPadding * 2.0, }}
                />
            </View>
        )
    }

    function updateProductCustomise({ id }) {
        const newList = customiseOptions.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isSelected: !item.isSelected };
                return updatedItem;
            }
            return item;
        });
        updateState({ customiseOptions: newList })
    }

    function customDialog() {
        return (
            <Dialog.Container
                visible={showCustomDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0, padding: 0.0, }}
                onBackdropPress={() => { updateState({ showCustomDialog: false }) }}
            >
                <View style={styles.customProductInfoWrapStyle}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            {selectedCustomProductName}
                        </Text>
                        <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor13Medium }}>
                            {selectedCustomProductAmount.toFixed(2)}{` XAF`}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showCustomDialog: false });
                            navigation.push('Products');
                        }}
                        style={{
                            ...styles.addButtonStyle,
                            backgroundColor: '#EEDBD4'
                        }}>
                        <Text style={{ ...Fonts.primaryColor16Medium }}>
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingTop: Sizes.fixPadding * 2.0, paddingHorizontal: Sizes.fixPadding * 2.0, }}>
                    {
                        customiseOptions.map((item) => (
                            <View
                                key={`{item.id} XAF`}
                                style={styles.customiseOptionWrapStyle}
                            >
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => updateProductCustomise({ id: item.id })}
                                        style={{
                                            ...styles.checkBoxStyle,
                                            backgroundColor: item.isSelected ? Colors.primaryColor : Colors.bodyBackColor,
                                        }}
                                    >
                                        {
                                            item.isSelected
                                                ?
                                                <MaterialIcons
                                                    name='check'
                                                    color={Colors.whiteColor}
                                                    size={17}
                                                />
                                                :
                                                null
                                        }
                                    </TouchableOpacity>
                                    <Text style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.blackColor14SemiBold }}>
                                        {item.option}
                                    </Text>
                                </View>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                </Text>
                            </View>
                        ))
                    }
                </View>
            </Dialog.Container>
        )
    }

    function categoriesListInfo() {
        return (
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center', paddingBottom: Sizes.fixPadding * 2.0, paddingLeft: Sizes.fixPadding * 2.0 }}
                >
                    {
                        categoriesList.map((item, index) =>
                            <View key={`{index} XAF`}
                                style={{ marginRight: Sizes.fixPadding * 2.0, alignItems: 'center' }}
                            >
                                {
                                    selectedCategory == item
                                        ?
                                        <View style={styles.selectedCategoryWrapStyle}>
                                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                                {item}
                                            </Text>
                                        </View>
                                        :
                                        <Text
                                            onPress={() => updateState({ selectedCategory: item })}
                                            style={{ ...Fonts.grayColor14Medium }}
                                        >
                                            {item}
                                        </Text>
                                }
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="arrow-back-ios"
                        color={Colors.blackColor}
                        size={22}
                        onPress={() => navigation.pop()}
                    />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.blackColor18SemiBold }}>
                        Las Vegas Complext
                    </Text>
                </View>
                <MaterialIcons
                    name="search"
                    color={Colors.blackColor}
                    size={22}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    headerWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedCategoryWrapStyle: {
        backgroundColor: '#DEE2EB',
        borderRadius: Sizes.fixPadding * 1.5,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 3.0,
    },
    addButtonStyle: {
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding + 10.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding,
        alignSelf: 'flex-end',
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        padding: 0.0,
        backgroundColor: Colors.bodyBackColor,
    },
    checkBoxStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: Sizes.fixPadding - 8.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
    },
    customiseOptionWrapStyle: {
        flexDirection: 'row',
        marginBottom: Sizes.fixPadding + 10.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    customProductInfoWrapStyle: {
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        backgroundColor: '#ECECEC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    foodInfoWrapStyle: {
        borderRadius: Sizes.fixPadding,
        elevation: 2.0,
        padding: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding + 10.0,
        ...CommonStyles.shadow,
    },
});

export default FoodOfDifferentCategoriesScreen;