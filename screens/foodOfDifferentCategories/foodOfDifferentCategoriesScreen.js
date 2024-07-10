import React, { useEffect, useState } from "react";
import { View, Dimensions, Image, FlatList, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import MyStatusBar from "../../components/myStatusBar";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../App";

const { width } = Dimensions.get('window');


const FoodOfDifferentCategoriesScreen = ({ navigation }) => {

  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [state, setState] = useState({showCustomDialog:false, selectedMenuId:null });
  

  const updateState = (data) => setState((state) => ({ ...state, ...data }))

  const { showCustomDialog, selectedMenuId } = state;

  const selectedMenu = menus.find(item => item.id ===selectedMenuId);

  const getAndSetCategories = async () => {
    try {
      const getMenuCategories = httpsCallable(functions, 'getMenuCategories');
      const {categories} = (await getMenuCategories()).data;
      setCategories(categories);
    } catch (error) {
      console.log('An error occured while getting menus: ', error);
    };
  };


  const getAndSetMenus = async () => {
    try {
      const getMenusList = httpsCallable(functions, 'getMenusList');
      const {menus} = (await getMenusList(category?{filter:category}:{})).data;
      setMenus(menus);
    } catch (error) {
      console.log('An error occured while getting menus: ', error);
    };
  };

  useEffect(() => {
    getAndSetMenus();
  }, [category]);
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
            source={{uri:item.imagesUrls.at(0)}}
            style={{
              width: width * 0.20,
              height: width * 0.20,
              borderRadius: Sizes.fixPadding - 5.0,
            }}
          />
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
            <Text style={{ ...Fonts.blackColor14SemiBold }}>
              {item.name}
            </Text>
            <Text style={{ marginVertical: Sizes.fixPadding - 7.0, ...Fonts.blackColor12SemiBold }}>
              {item.price.toFixed(2)} {item.currency}
            </Text>
            {
              item.specs.length !=0
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
            item.specs.length
              ?
              updateState({ selectedMenuId:item.id, showCustomDialog: true, })
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
          data={menus}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Sizes.fixPadding - 8.0, paddingHorizontal: Sizes.fixPadding * 2.0, }}
        />
      </View>
    )
  }

  function updateProductCustomise({ id }) {
    const newList = selectedMenu?.specs.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, isSelected: !item.isSelected };
        return updatedItem;
      }
      return item;
    })||[];
    
    const newMenus = menus.map(menu => menu.id !==id?menu:{...menu, specs:newList});
    setMenus(newMenus);
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
              {selectedMenu?.name}
            </Text>
            <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor13Medium }}>
              {selectedMenu?.price.toFixed(2)} {selectedMenu?.currency}
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
            selectedMenu?.specs.map((item) => (
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
            categories.map((item, index) =>
              <View key={index}
                style={{ marginRight: Sizes.fixPadding * 2.0, alignItems: 'center' }}
              >
                {
                  category == item.key
                    ?
                    <View style={styles.selectedCategoryWrapStyle}>
                      <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {item.title}
                      </Text>
                    </View>
                    :
                    <Text
                      onPress={() => setCategory(item.key)}
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